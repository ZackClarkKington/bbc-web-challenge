const webpack = require('webpack');
const wpConfig = require('../webpack.config');
const wpDevServer = require('webpack-dev-server');

new wpDevServer(webpack(wpConfig), {
    compress: true,
    publicPath: '/' + wpConfig.output.publicPath,
    stats: {
        colors:true
    },
    hot:true,
    watchOptions: {
        ignored: /node_modules/
    }
}).listen(8081, 'localhost', (err) => {
    if(err) console.log(err);
});