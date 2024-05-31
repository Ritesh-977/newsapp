import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imgurl,newsUrl } = this.props;
    return (
      <div className="container my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgurl? imgurl:"news.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <a target="_blank" rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
