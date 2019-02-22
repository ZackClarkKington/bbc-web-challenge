import React, {Component} from 'react';
import Article from './Article';
import ConnectionManager from '../ConnectionManager';

class ArticleViewer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {articleNum: 0, articles: []};
    this.connManager = new ConnectionManager();
    this.getNextArticle = this.getNextArticle.bind(this);
    this.updateArticles = this.updateArticles.bind(this);
  }

  getNextArticle() {
    this.connManager.getArticleWithId(this.state.articleNum + 1)
      .then( (newArticle) => {
        this.updateArticles(newArticle);
      });
  }

  updateArticles(newArticle) {
    this.setState((state, props) => {
      var newArticles = state.articles;
      newArticles.push(newArticle);
      return {articles: newArticles};
    });
  }

  componentDidMount() {
    this.getNextArticle();
  }

  render() {
    return (
      <div className="shadow padded auto-margins article-container">
        <Article article={this.state.articles[this.state.articleNum]}/>
      </div>
    );
  }
}

export default ArticleViewer;