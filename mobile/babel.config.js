module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@providers": "./src/providers",
            "@functions": "./src/functions",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@screens": "./src/screens",
            "@screens/*": "./src/screens/*",
            "@modals": "./src/modals",
            "@modals/*": "./src/modals/*",
            "@styles/*": "./src/styles/*",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@icons": "./src/icons",
            "@assets": "./src/assets",
            "@types": "./src/types"
          },
        },
      ],
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ],
  }
};
