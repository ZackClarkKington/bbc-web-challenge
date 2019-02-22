import React, {Component} from 'react';
import ArticleImage from './ArticleImage';
import ArticleList from './ArticleList';

class Article extends Component {

  elements = {
    "heading": (element, index) => {
      return (
        <h2 key={index} className="centered-text">{element.model.text}</h2>
      );
    },
    "paragraph": (element, index) => {
      return (
        <p key={index}>{element.model.text}</p>
      );
    },
    "image": (element, index) => {
      return (
        <ArticleImage key={index} model={element.model} />
      );
    },
    "list": (element, index) => {
      return (
        <ArticleList key={index} model={element.model} />
      );
    }
  };

  constructor(props, context){
    super(props, context);
  }

  constructElement(element, index){
    if(typeof(element) === 'undefined' || !this.elements.hasOwnProperty(element.type)) return null;
    return this.elements[element.type](element, index);
  }

  render() {
    let articleBody = [];
    let title = "Loading next article...";
    if(this.props.article !== undefined){
      title = this.props.article.title;
      this.props.article.body.forEach((element, index) => {
        articleBody.push(this.constructElement(element, index));
      });
    }
    return (
      <div className="auto-margins">
        <h1 className = "centered-text">{title}</h1>
        <div>
          {articleBody}
        </div>
      </div>
    );
  }
}

export default Article;