import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    category: "general",
  };

  static propTypes = {
    category: PropTypes.string,
  };

  nextResult;
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews () {
    const url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=e7079cdf954d439dbf9a1d931bd1bb50&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }


  handlePreviousClick = async () => {
   this.setState({page: this.state.page - 1});
   this.updateNews();
  };
  
  handleNextClick = async () => {
    await this.setState({page: this.state.page + 1})
    this.updateNews();
  };
  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h2 className="text-center my-4">
          <strong>NewsMonkey - Top headlines</strong>
        </h2>
        {this.state.loading && <Spinner />}
        <div className="row gy-5">
          {!this.state.loading &&
            this.state.articles.map((elem) => {
              return (
                <div className="col-md-4">
                  <NewsItem
                    key={elem.urlToImage}
                    title={elem.title ? elem.title : ""}
                    description={elem.description ? elem.description : ""}
                    urlToImage={elem.urlToImage}
                    url={elem.url}
                    author={elem.author}
                    date={elem.publishedAt}
                    source={elem.source}
                  />
                </div>
              );
            })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
