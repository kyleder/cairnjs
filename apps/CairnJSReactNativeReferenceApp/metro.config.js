/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const {makeMetroConfig} = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const findUp = require('find-up');
const path = require('path');
const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts;

const getRepoRoot = () => {
  return path.dirname(findUp.sync('pnpm-workspace.yaml'));
};

module.exports = makeMetroConfig({
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  projectRoot: __dirname,
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
    sourceExts: [...defaultSourceExts, 'cjs'],
  },
  watchFolders: [getRepoRoot()],
});
