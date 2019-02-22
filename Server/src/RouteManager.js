class RouteManager {
  constructor(app){
    this.app = app;
  }

  initRoutes() {
    this.app.express.use('/', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });

    this.app.express.get('/articles/:articleId', (req, res) => {
      let articleNum = req.params['articleId'];
      res.type('json');
      res.json(this.app.store.getArticle(articleNum));
    });
  }
}

module.exports.RouteManager = RouteManager;