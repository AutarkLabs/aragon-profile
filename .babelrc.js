module.exports = api => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: api.env('test') ? 'commonjs' : false,
        useBuiltIns: false,
        targets: {
          node: 'current'
        }
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'styled-components',
      {
        displayName: true
      }
    ],
    '@babel/plugin-proposal-class-properties'
  ]
})
