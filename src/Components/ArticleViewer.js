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
    this.nextArticleButtonClicked = this.nextArticleButtonClicked.bind(this);
    this.previousArticleButtonClicked = this.previousArticleButtonClicked.bind(this);
  }

  getNextArticle(indexOffset) {
    indexOffset = indexOffset == undefined ? 0 : indexOffset;
    return this.connManager.getArticleWithId(this.state.articles.length + indexOffset);
  }

  updateArticles(newArticles) {
    this.setState((state, props) => {
      var articles = state.articles;
      newArticles.forEach(article => {
        articles.push(article);
      });
      return {articles: articles};
    });
  }

  componentDidMount() {
    this.getNextArticle().then((newArticle) => {
      this.getNextArticle(1).then((nextNewArticle) => {
        var articlesToAdd = [newArticle, nextNewArticle];
        this.updateArticles(articlesToAdd);
      });
    });
  }

  nextArticleButtonClicked(){
    if(this.state.articles.length < 5){
      this.getNextArticle().then((newArticle) => {
        this.setState((state, props) => {
          var articles = state.articles;
          articles.push(newArticle);
          return {articleNum: state.articleNum + 1, articles: articles};
        });
      });
    } else {
      this.setState({articleNum: this.state.articleNum + 1});
    }
  }

  previousArticleButtonClicked(){
    this.setState((state, props) => {
      return {articleNum: state.articleNum - 1};
    });
  }

  render() {
    let nextButtonDisabled = this.state.articleNum >= 4;
    let previousButtonDisabled = this.state.articleNum <= 0;
    return (
      <div className="shadow padded auto-margins article-container">
        <button disabled={previousButtonDisabled} onClick={this.previousArticleButtonClicked}>Previous Article</button>
        <button disabled={nextButtonDisabled} onClick={this.nextArticleButtonClicked}>Next Article</button>
        <Article article={this.state.articles[this.state.articleNum]}/>
      </div>
    );
  }
}

export default ArticleViewer;