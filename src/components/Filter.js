import React, { Component } from "react";
import store from "./DataStore";
import { observer } from "mobx-react";
import "./Grid.css";

const Filter = observer(
  class Filter extends Component {
    constructor() {
      super();
      this.state = {
        content: "",
        filters: [],
      };
    }

    componentDidMount() {
      console.log(this.state.filters);
    }

    componentDidUpdate() {
      this.filterArticles(store.articles);
    }

    handleChange = (event) => {
      this.setState({
        content: event.target.value,
      });
    };

    handleSubmit = (event) => {
      // console.log(this.props.user)
      event.preventDefault();
      //   store.filter.push("test")
      if (event.target.filter.value.length > 0) {
        // console.log(event.target.filter.value);
        this.setState({
          filters: [...this.state.filters, event.target.filter.value.toLowerCase()],
          content: "",
        });
        //   console.log(this.state.filter);
        // console.log(store.articles)

        // don't run below line until state sets | how do?
      }
    };

    filterArticles = (articles) => {
      // if filter is empty pass article through
    //   console.log(this.state.filters);
    //   const includedArticles = [];

      articles.forEach((article) => {
        let includeArticle = true;
        this.state.filters.forEach((filter) => {
          if (!article.title.toLowerCase().includes(filter)) {
            article.show = false;
          }
        });
      });

      //   for (let j = 0; j < articles.length; j++) {
      //     // console.log(articles[j].title);
      //     const includeArticle = false;
      //     for (let i = 0; i < this.state.filters.length; i++) {
      //       console.log(this.state.filters[i]);
      //       if (articles[j].title.includes(this.state.filters[i])) {
      //         includeArticle = true;
      //       } else {
      //         includeArticle = false;
      //         break;
      //       }
      //     }

      //     if (includeArticle === true) {
      //       allowed.push(articles[j]);
      //     }
      //   }
      //   console.log(allowed);
    //   store.articles = includedArticles;
    };

    // filterArray = (array, filters) => {
    //   const filterKeys = Object.keys(filters);
    //   return array.filter((item) => {
    //     // validates all filter criteria
    //     return filterKeys.every((key) => {
    //       // ignores non-function predicates
    //       if (typeof filters[key] !== "function") return true;
    //       return filters[key](item[key]);
    //     });
    //   });
    // };

    clearFilter = () => {
      this.setState({
        filters: [],
      });
      store.articles.forEach(article => article.show = true)
      //   console.log(this.state.filters)
    };

    removeKeyword = (key) => {
        this.setState({
            filters: [...this.state.filters.filter((keyword) => keyword !== key)],
        });
        //figure out the sync issue | get below lines to run AFTER state set
      this.clearFilter();
      this.filterArticles(store.articles)
    };

    render() {
      return (
        <div className="Filter">
          <form onSubmit={this.handleSubmit}>
            <input
              type="filter"
              name="filter"
              placeholder="Type a Keyword"
              value={this.state.content}
              onChange={this.handleChange}
            ></input>
            <button type="submit">Add a Filter Keyword</button>
            <button onClick={this.clearFilter}>Clear Filter</button>
          </form>
          {/* {store.filter[1] || store.filter[0] !== ""
            ? store.filter
                .filter((keyword) => keyword !== "") */}
          {
            this.state.filters.map((keyword) => (
              <button key={keyword} onClick={() => this.removeKeyword(keyword)}>
                {keyword}
              </button>
            ))
            // : null
          }
        </div>
      );
    }
  }
);

export default Filter;
