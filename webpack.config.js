const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'dist.js',
  },
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    host: 'localhost',
    hot: true,
    open: true,
    compress: true,
    // historyApiFallback: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, '/dist'),
      publicPath: '/',
    },
    proxy: {
      '/': 'http://localhost:3000',
      secure: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/client/public/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /(node_modules)/,
        use: 'ts-loader',
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
};
