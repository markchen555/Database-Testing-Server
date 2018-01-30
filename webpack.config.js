const path = require('path');
const nodeExternals = require('webpack-node-externals');

// const webpackConfig = {
//   target: 'node',
//   externals: [nodeExternals()],
//   entry: path.resolve(__dirname, './server/server.js'),
//   output: {
//     path: path.resolve(__dirname, './client/static'),
//     filename: 'bundle.js',
//   },
//   module: {
//     loaders: [],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   devtool: 'inline-source-map',
// };

// webpackConfig.module.loaders.push({
//   test: /\.js[x]?$/,
//   exclude: /node_modules/,
//   loader: 'babel-loader',
//   // options: { presets: ['env', 'react'] },
// });

// // webpackConfig.module.loaders.push({
// //   test: /\.(css)$/,
// //   loaders: ['style-loader', 'css-loader?url=false']
// // });

// // webpackConfig.module.loaders.push({
// //   test: /\.(png|jpg|gif|jpeg)$/,
// //   loader: 'file-loader',
// //   options: {}
// // });

// module.exports = webpackConfig;

// Video way
module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'index': './server/index.js',
  },
  output: {
    path: path.join(__dirname, 'client/static'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

