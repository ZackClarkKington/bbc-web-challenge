class RouteManager {
  constructor(app){
    this.app = app;
  }

  /*
  * initRoutes - initialises all the API routes that may be used by this web application
  */
  initRoutes() {
    //Set up all routes to work with cross origin requests
    this.app.express.use('/', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
      next();
    });
    
    this.app.express.get('/articles/:articleId', (req, res) => {
      let articleNum = req.params['articleId'];
      res.type('json');
      res.json(this.app.store.getArticle(articleNum));
    });

    this.app.express.post('/ranks', (req, res) => {
      let ranks = req.body.ranks;
      this.app.store.updateArticleRanks(ranks);
      res.type('json');
      res.json({success: true});
    });
  }
}

module.exports.RouteManager = RouteManager;