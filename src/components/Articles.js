import React from "react";
import ArticleContainer from "./ArticleContainer";
// import store from "./DataStore.js";
// import Axios from "axios";

class Articles extends React.Component {
//   populateStore = () => {
//     Axios.get("http://localhost:3001/articles").then(
//       (articles) => (store.articles = articles)
//     );
//   };

//   componentDidMount() {
//     this.populateStore();
//   }
  render() {
    // console.log(this.props.store)
    return (
      <div>
        <ArticleContainer store={this.props.store}/>
      </div>
    );
  }
}

export default Articles;
