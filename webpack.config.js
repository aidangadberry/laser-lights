var path = require('path');

module.exports = {
  entry : './javascripts/app.js',
  output : {
      path : path.join(__dirname, './'),
      filename : 'bundle.js'
  },
  devtool: 'source-map'
};
