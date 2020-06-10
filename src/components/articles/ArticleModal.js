import React from "react";
import { Modal } from "semantic-ui-react";
import ArticlePost from "./ArticlePost";

const ArticleModal = (props) => (
  <Modal trigger={<ArticlePost article={props.article} {...props} />}>
    <Modal.Header>{/*insert article title here*/}</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <a href={`${props.article.url}`}>Link to Guide</a>
      </Modal.Description>
      Lorem Ipsum
    </Modal.Content>
  </Modal>
);

export default ArticleModal;
