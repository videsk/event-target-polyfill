import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const banner = `
/**
 * Copyright (C) ${new Date().getFullYear()} by Videsk - All Rights Reserved
 * @name ${pkg.name}
 * @author ${pkg.author}
 * @license ${pkg.license}
 * Maintained by Videsk
 *
 * ${pkg.description}
 *
*/`;

export default [{
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'iife',
      esModule: false,
      sourcemap: false,
      strict: false,
      inlineDynamicImports: true,
      banner,
    },
  ],
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    terser(),
  ],
  watch: {
    clearScreen: false
  }
}];
