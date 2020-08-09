import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named'
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named'
    }
  ],
  plugins: [typescript(), terser()]
}
