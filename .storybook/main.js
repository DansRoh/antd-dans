/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../stories/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
