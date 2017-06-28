"use strict";

const helpers = require('./helpers');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {

  entry: './index.js',

  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'mustache-loader'
      }
    ]
  },

  output: {
    filename: 'index.js',
    path: helpers.root('dist'),
    libraryTarget: 'umd'
  },

  plugins: [
    new StaticSiteGeneratorPlugin({
      paths: [
        '/SVENSKA/',
        '/ENGELSKA/',
        '/ARABISKA/',
        '/DARI/',
      ],
      locals: {
        // Properties here are merged into `locals`
        // passed to the exported render function
      }
    })
  ]

};
