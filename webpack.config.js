module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js',
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff2?|ttf|eot|svg|png)$/,
        loader: 'file-loader',
        query: {
          name: 'dist/[name].[ext]',
        },
      },
    ],
  },
}
