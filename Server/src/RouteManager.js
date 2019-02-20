class RouteManager {
  constructor(app){
    this.app = app;
  }

  initRoutes() {
    this.app.express.get('/articles/:articleId', (req, res) => {
      let articleNum = req.params['articleId'];
      res.send(JSON.stringify(this.app.store.getArticle(articleNum)));
    });
  }
}

module.exports.RouteManager = RouteManager;