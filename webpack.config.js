module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './dist/bundle.js',
    library: 'aragon-profile',
    libraryTarget: 'umd',
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  useBuiltIns: false,
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              [
                'styled-components',
                {
                  displayName: true,
                },
              ],
              '@babel/plugin-proposal-class-properties',
            ],
          },
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
