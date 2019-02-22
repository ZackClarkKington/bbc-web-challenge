const path = require('path');
module.exports = {
  "mode": "development",
  "entry": path.join(__dirname, "/src/index.js"),
  "output": {
      "path": path.join(__dirname, '/public/'),
      "filename": "bundle.js",
      "publicPath": "/public/"
  },
  "devServer": {
      //"historyApiFallBack": true,
      "compress": true,
      "publicPath": "/public/",
      "stats": {
          "colors": true
      },
      "hot": true,
      "watchOptions": {
          "ignored": /node_modules/
      },
      "port": 8081
  },
  "module": {
      "rules": [
          {
              "enforce": "pre",
              "test": /\.(js|jsx)$/,
              "exclude": /node_modules/,
              "use": "eslint-loader"
          },
          {
              "test": /\.(js|jsx)$/,
              "exclude": /node_modules/,
              "use": {
                  "loader": "babel-loader",
                  "options": {
                      "presets": [
                          "@babel/env",
                          "@babel/react"
                      ],
                      "plugins": [
                          "@babel/plugin-proposal-class-properties",
                          "@babel/plugin-proposal-object-rest-spread"
                      ]
                  }
              }
          },
          {
              "test": /\.scss$/,
              "use": [
                  "style-loader",
                  "css-loader",
                  "sass-loader"
              ]
          }
      ]
  }
}