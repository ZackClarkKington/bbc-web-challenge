const express = require('express');
const RouteManager = require('./RouteManager').RouteManager;
const ArticleStore = require('./ArticleStore').ArticleStore;

var app = {};
app.express = express();
app.store = new ArticleStore();
app.routeManager = new RouteManager(app);
app.routeManager.initRoutes();
app.express.listen(8080, 'localhost');