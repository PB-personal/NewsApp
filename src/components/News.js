import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    category: "general",
  };

  static propTypes = {
    category: PropTypes.string,
  };

  nextResult;
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
      totalResults: 0,
    };
    document.title = `${this.doUpperCase(this.props.category)} - Top headlines`;
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    this.props.setProgress(0);

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e7079cdf954d439dbf9a1d931bd1bb50&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(70);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  doUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e7079cdf954d439dbf9a1d931bd1bb50&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
    // this.updateNews();
  };
  render() {
    console.log("render");
    return (
      <>
        <h1 className="text-center my-3">
          NewsMonkey - Top {this.doUpperCase(this.props.category)} headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}
          scrollableTarget="scrollableDiv"
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((elem) => {
                return (
                  <div className="col-md-4" key={elem.urlToImage}>
                    <NewsItem
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
          </div>
        </InfiniteScroll>
      </>

      /* <div className="container d-flex justify-content-between">
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
        </div> */
    );
  }
}

export default News;
