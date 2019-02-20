const fs = require('fs');

class ArticleStore {
  constructor(){
    this.articles = [];
    for(var i = 1; i < 6; i++){
      var articleObj = JSON.parse(fs.readFileSync(`data/article-${i}.json`, 'utf8'));
      this.articles.push(articleObj);
    }
  }

  getArticle(articleId){
    if(this.articles.hasOwnProperty(articleId)){
      return this.articles[articleId];
    }

    return null;
  }
}

module.exports.ArticleStore = ArticleStore;