import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import json from 'rollup-plugin-json'

import pkg from './package.json'

const onwarn = warning => {
  // Silence circular dependency warning for moment package
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    console.error(`(!) ${warning.message}`)
  }
}

export default {
  input: 'src/index.js',
  onwarn,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    url({ exclude: ['**/*.svg'] }),
    svgr(),
    babel({
      exclude: 'node_modules/**',
    }),
    json(),
    resolve(),
    commonjs(),
  ],
  external: ['react', 'react-dom', 'styled-components'],
}
