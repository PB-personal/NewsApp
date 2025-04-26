import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, urlToImage, url, author, date, source } = this.props;
    return (
      <div>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '95%', zIndex: '1'}}>
    {source.name}
  </span>
          <img
            src={
              urlToImage
                ? urlToImage
                : "https://sportsfly.cbsistatic.com/fly-0945/bundles/sportsmediacss/images/fantasy/default-article-image-large.png"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body" style={{ maxHeight: "10%" }}>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author? author : 'unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={url} rel="noreferrer" target="_blank" className="btn btn-primary btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
