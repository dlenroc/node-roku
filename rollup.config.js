import nodeResolve from '@rollup/plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const cwd = process.cwd();
const pkg = require(cwd + '/package.json');

export default {
  input: cwd + '/src/index.ts',
  external: Object.keys(pkg.dependencies),
  output: [
    {
      file: cwd + '/' + pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: cwd + '/' + pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    string({ include: '**/*.{xml,brs}' }),
    typescript({ tsconfig: __dirname + '/tsconfig.json' }),
    terser(),
  ],
};
