import React, {Component} from 'react';
import ArticleImage from './ArticleImage';

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
    }
  };

  constructor(props, context){
    super(props, context);
    this.article = this.props.article;
  }

  constructElement(element){
    if(typeof(element) === 'undefined' || !this.elements.hasOwnProperty(element.type)) return null;
    return this.elements[element.type](element);
  }

  render() {
    let articleBody = [];
    this.article.body.forEach(element => {
      articleBody.push(this.constructElement(element));
    });
    return (
      <div>
        <h1>{this.article.title}</h1>
        <div>
          {articleBody}
        </div>
      </div>
    );
  }
}

export default Article;