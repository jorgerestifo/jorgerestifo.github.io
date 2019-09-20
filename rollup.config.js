import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const args = process.argv;
const input = args[4];
const env = process.env.BUILD || 'dev';
const pathArr = input.split('/');
const outpath = pathArr.slice(1, [pathArr.length - 1]).join('/');
// console.log(env);

export default {
  input: input,
  output: {
    file: `dist/${outpath}/bundle.js`,
    format: 'iife'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      customResolveOptions: {
        moduleDirectory: './lib/modules'
      }
    }),
    commonjs(),
    eslint({
      exclude: [
        'src/**/*.{css,scss,sass,less}'
      ]
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    (/prod/i.test(env) && uglify())
  ]
};
