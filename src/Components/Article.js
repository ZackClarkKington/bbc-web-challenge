import React, {Component} from 'react';
import ArticleImage from './ArticleImage';
import ArticleList from './ArticleList';

class Article extends Component {

  elements = {
    "heading": (element) => {
      return (
        <h2>{element.model.text}</h2>
      );
    },
    "paragraph": (element) => {
      return (
        <p>{element.model.text}</p>
      );
    },
    "image": (element) => {
      return (
        <ArticleImage model={element.model} />
      );
    },
    "list": (element) => {
      return (
        <ArticleList model={element.model} />
      );
    }
  };

  constructor(props, context){
    super(props, context);
  }

  constructElement(element){
    if(typeof(element) === 'undefined' || !this.elements.hasOwnProperty(element.type)) return null;
    return this.elements[element.type](element);
  }

  render() {
    console.log(this.props);
    let articleBody = [];
    let title = "Loading next article...";
    if(this.props.article !== undefined){
      title = this.props.article.title;
      this.props.article.body.forEach(element => {
        articleBody.push(this.constructElement(element));
      });
    }
    return (
      <div>
        <h1>{title}</h1>
        <div>
          {articleBody}
        </div>
      </div>
    );
  }
}

export default Article;