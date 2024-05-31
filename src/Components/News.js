import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=5c5e7ede4acf4207912f9469a997288f&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    console.log(data);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})

  }
  handlePrevClick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=5c5e7ede4acf4207912f9469a997288f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    console.log(data);
    let parsedData = await data.json();
   // console.log(parsedData);
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
      loading:false
    })

  }
  handleNexClick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=5c5e7ede4acf4207912f9469a997288f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    console.log(data);
    let parsedData = await data.json();
   // console.log(parsedData);
    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles,
      loading:false
    })
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsHub - Top Headline</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
           return <div className="col-md-4"> <Newsitem key = {element.url} 
            title={element.title?element.title.slice(0,45):""}  
            description={element.description ? element.description.slice(0,85):""} imgurl={element.urlToImage} newsUrl={element.url} />
           </div>
         })}
         
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button " className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button  disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button " className="btn btn-dark" onClick={this.handleNexClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
