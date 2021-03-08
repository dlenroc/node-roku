import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  external: [],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    string({ include: '**/*.xml' }),
    string({ include: '**/*.brs' }),
    typescript({ useTsconfigDeclarationDir: true }),
    terser()
  ],
};
