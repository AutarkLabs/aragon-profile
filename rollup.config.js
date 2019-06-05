import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import url from 'rollup-plugin-url'
import filesize from 'rollup-plugin-filesize'
import json from 'rollup-plugin-json'
import progress from 'rollup-plugin-progress'
import builtins from 'rollup-plugin-node-builtins';
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [{ file: pkg.main, name: 'index.js', format: 'iife' }],
  external: ['react', 'react-dom', 'styled-components'],
  globals: {
    react: 'React',
    'styled-component': 'styled',
  },
  plugins: [
    progress(),
    json(),
    builtins(),
    url({
      limit: 5 * 1024, // inline files smaller than 5k
      publicPath: '',
      include: ['**/*.svg', '**/*.png', '**/*.jpg'],
      emitFiles: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs({ include: 'node_modules/**' }),
  ],
}
