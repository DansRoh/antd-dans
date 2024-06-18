import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss';

const overrides = {
  compilerOptions: { declaration: true },
  exclude: ["stories/**", "library/**/*.test.tsx", "library/**/*.stories.tsx", "library/**/*.stories.mdx", "library/setupTests.ts"]
};

const config = {
  input: 'library/index.ts',
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'], // 添加 .ts 和 .tsx 扩展名
    }),
    babel({
      exclude: ['node_modules/**'],
      presets: ['@babel/preset-env', '@babel/preset-react'], // 使用 React 预设
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx'], // 添加 .ts 和 .tsx 扩展名
    }),
    commonjs(),
    json(),
    typescript({ tsconfigOverride: overrides }),
    sass({ output: 'dist/index.css' }),
    postcss({
      extensions: ['.css', '.less'], // 处理 .less 文件
      use: [
        ['less', { javascriptEnabled: true }],
      ],
    })
  ],
};

export default config;
