const {resolve} = require("node:path");
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: ["@chromatic-com/storybook"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(config, { configType }) {
    // 自定义 Vite 配置，用于路径别名解析
    config.resolve.alias = {
      ...config.resolve.alias,
      // 添加你的路径别名
      library: resolve(__dirname, '../library'),
    };
    return config;
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
module.exports = config;
