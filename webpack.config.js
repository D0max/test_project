const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Main webpack config module


module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js)x?|js$/,
        exclude: [/node_modules/, /bower_components/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        // Reading tsx and jsx
      },

      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(s[ac]ss)?$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
        // connecting scss preprocessor and css
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
