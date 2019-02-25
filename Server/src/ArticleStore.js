const fs = require('fs');

class ArticleStore {
  constructor(){
    //Read in all the articles from their JSON files and give them a starting rank based on their position in the article ordering
    this.articles = [];
    for(var i = 1; i < 6; i++){
      var articleObj = JSON.parse(fs.readFileSync(`data/article-${i}.json`, 'utf8'));
      articleObj.rank = Number(i) - 1;
      this.articles.push(articleObj);
    }
  }

  /*
  * getArticle - Returns an article based on its' article id or returns null
  */
  getArticle(articleId){
    if(this.articles.hasOwnProperty(articleId)){
      return this.articles[articleId];
    }

    return null;
  }

  /*
  * updateArticleRanks - iterates through array of article ids and updates each article's ranking based on its' position within the array
  */
  updateArticleRanks(ranks){
    ranks.forEach((article, index) => {
      if(this.articles.hasOwnProperty(article)){
        this.articles[article].rank = index;
      }
    });
  }
}

module.exports.ArticleStore = ArticleStore;