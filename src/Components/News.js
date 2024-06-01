import React, { useEffect, useState} from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const  News = (props)=> {
  const[articles, setArticles] = useState([]);
  const[loading, setLoading] = useState(false);
  const[page, setPage] = useState(1);
  const[totalResults, setTotalResults] = useState(0);

 const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 
const updateNews= async ()=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=1b4c1c0141de44839b403b4382f74095&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100)
  }
  useEffect(()=>{
    document.title = props.category;
    updateNews();
    // eslint-disable-next-line
  },[])
  
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=1b4c1c0141de44839b403b4382f74095&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)

  };
    return (
      <>
        <h2 className="text-center" style = {{margin: '35px 0px', marginTop:'90px'}}>
          NewsHub - Top {capitalizeLetter(props.category)} Headline
        </h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
           <div className="container">

          <div className="row ">
            {articles.map((element,index) => {
              return (
                <div className="col-md-4" key = {index}>
                  <Newsitem
                    key={element.url}
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 85)
                        : ""
                    }
                    imgurl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        </>
    );
    
  }
export default News;

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};