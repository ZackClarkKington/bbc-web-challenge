const express = require('express');
const RouteManager = require('./RouteManager').RouteManager;
const ArticleStore = require('./ArticleStore').ArticleStore;
const bodyParser = require('body-parser');

var app = {};
app.express = express();
app.express.use(bodyParser.json());
app.express.use(bodyParser.urlencoded({extended: true}));
app.store = new ArticleStore();
app.routeManager = new RouteManager(app);
app.routeManager.initRoutes();
app.express.listen(8080, 'localhost');