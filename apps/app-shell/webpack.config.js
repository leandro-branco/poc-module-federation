const nrwlConfig = require("@nrwl/react/plugins/webpack.js");
const {  ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('../../package.json');

module.exports = (config, context) => {
  config.context = process.cwd();

  nrwlConfig(config);

  return {
    ...config,
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: 'shell',
        remotes: {
          'members': `members@${getRemoteEntryUrl(4202)}`,
          'creators': `creators@${getRemoteEntryUrl(4201)}`,
        },
        shared: {
          ...dependencies,
          react: { singleton: true, strictVersion: true, requiredVersion: dependencies['react'], eager: true },
          'react-dom': { singleton: true, strictVersion: true, requiredVersion:  dependencies['react-dom'], eager: true },
          'react-router-dom': { singleton: true, strictVersion: true, requiredVersion:  dependencies['react-router-dom'], eager: true },
          firebase: { singleton: true, strictVersion: true, requiredVersion:  dependencies['firebase'], eager: true },
        },
      }),
    ],
  };
};

function getRemoteEntryUrl(port) {
  return `http://localhost:${port}/remoteEntry.js`;
}
