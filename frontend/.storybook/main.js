const path = require("path");

module.exports = {
  stories: ["../**/*.stories.@(js|mdx|ts|tsx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next",
    "storybook-addon-mock",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: { builder: "@storybook/builder-webpack5" },
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve?.alias,
      "@": [path.resolve(__dirname, "../"), path.resolve(__dirname, "../")],
      "@api": [path.resolve(__dirname, "api/")],
      "@components": [path.resolve(__dirname, "components/")],
      "@svg": [path.resolve(__dirname, "styles/svg/")],
      "@api/*": ["./api/*"],
      "@components/*": ["./components/*"],
      "@svg/*": ["./styles/svg/*"],
    };
    config.resolve.roots = [
      path.resolve(__dirname, "../public"),
      "node_modules",
    ];
    config.resolve.fallback = {
      ...config.resolve?.fallback,
      fs: false,
      stream: false,
      os: false,
    };
    return config;
  },
};
