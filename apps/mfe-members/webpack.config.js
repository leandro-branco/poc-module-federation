const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('../../package.json');

module.exports = (config) => {
  config.context = process.cwd();
  config.optimization.runtimeChunk = false;

  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'members',
      filename: 'remoteEntry.js',
      exposes: {
        './App': 'apps/mfe-members/src/app/index.tsx',
      },
       shared: {
         ...dependencies,
         react: { singleton: true, strictVersion: true, requiredVersion: dependencies['react'], eager: true },
         'react-dom': { singleton: true, strictVersion: true, requiredVersion:  dependencies['react-dom'], eager: true },
         firebase: { singleton: true, strictVersion: true, requiredVersion:  dependencies['firebase'], eager: true },
       },
    })
  );

  config.output = {
    uniqueName: 'members',
    publicPath: 'auto',
  }

  return config;
};
