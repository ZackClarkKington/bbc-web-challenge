const expect = require('expect');
const ArticleStore = require('./ArticleStore').ArticleStore;
const fs = require('fs');

var store = new ArticleStore();

var articles = [];
for(var i = 1; i < 6; i++){
  var articleObj = JSON.parse(fs.readFileSync(`data/article-${i}.json`, 'utf8'));
  articles.push(articleObj);
}

describe('ArticleStore', () => {
  it('correctly returns each article based on the specified index', () => {
    articles.forEach((article, index) => {
      expect(store.getArticle(index)).toEqual(article);
    });
  });

  it('should return null when an invalid article id is used', () => {
    expect(store.getArticle(10)).toBeNull();
  });
});