import React, {Component} from 'react';
import Article from './Article';
import ArticleRanker from './ArticleRanker';
import ConnectionManager from '../ConnectionManager';

class ArticleViewer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {articleNum: 0, articles: [], rankedArticles: []};
    this.connManager = new ConnectionManager();
    this.getNextArticle = this.getNextArticle.bind(this);
    this.updateArticles = this.updateArticles.bind(this);
    this.nextArticleButtonClicked = this.nextArticleButtonClicked.bind(this);
    this.previousArticleButtonClicked = this.previousArticleButtonClicked.bind(this);
  }

  /*
  * getNextArticle - returns the next article stored, or the next article plus an offset passed in (this is useful for pre-loading articles)
  */
  getNextArticle(indexOffset) {
    indexOffset = indexOffset == undefined ? 0 : indexOffset;
    return this.connManager.getArticleWithId(this.state.articles.length + indexOffset);
  }

  /*
  * updateArticles - Adds any new articles that might have been retrieved from the API into the state
  */
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
    //When the component mounts, load the first 2 articles in and add them to the state
    this.getNextArticle().then((newArticle) => {
      this.getNextArticle(1).then((nextNewArticle) => {
        var articlesToAdd = [newArticle, nextNewArticle];
        this.updateArticles(articlesToAdd);
      });
    });
  }

  /*
  * nextArticleButtonClicked - triggers moving to the next article
  */
  nextArticleButtonClicked(){
    //If there are still articles to load in, preload the another article and advance to the next one
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

  /*
  * previousArticleButtonClicked - triggers moving to the previous article
  */
  previousArticleButtonClicked() {
    this.setState((state, props) => {
      return {articleNum: state.articleNum - 1};
    });
  }

  render() {
    let nextButtonDisabled = this.state.articleNum >= 5;
    let previousButtonDisabled = this.state.articleNum <= 0;
    //If we move past the last article, display the ArticleRanker component instead
    let articleViewerBody = (this.state.articleNum < 5)? <Article article={this.state.articles[this.state.articleNum]} /> : <ArticleRanker connManager={this.connManager} articles={this.state.articles} />;
    return (
      <div className="shadow padded auto-margins article-container">
        <button disabled={previousButtonDisabled} onClick={this.previousArticleButtonClicked}>Previous Article</button>
        <button disabled={nextButtonDisabled} onClick={this.nextArticleButtonClicked}>Next Article</button>
        {articleViewerBody}
      </div>
    );
  }
}

export default ArticleViewer;