# explorer-core-plugins

Core plugins for Alethio Explorer

## Project structure

The project contains 3 core plugins that provide basic explorer functionality and which share the same codebase, dependencies and build process. Each plugin has a folder in `packages/<pluginName>`, from which a separate npm package is created:

- [eth-common](./packages/eth-common/README.md) - common pages and modules that should be available regardless of what data source is used
- [eth-extended](./packages/eth-extended/README.md) - pages, modules and data sources specific to the "full" explorer. This plugin uses the Alethio explorer API endpoints and a Deepstream connection
- [eth-lite](./packages/eth-lite/README.md) - a "lite" explorer plugin, using `web3` as a data source. It only offers what can be directly fetched from an eth node, without the aggregations provided by the Alethio API.

## Development

### Install (Linux, MacOS)

`npm install`

### Install (Windows)

`npm --add-python-to-path='true' --debug install --global windows-build-tools`
`npm install` just as with Linux

### Build

`npm run watch` or `npm run build-dev`.

### Link to an explorer installation

You can `acp link` any plugin folder into your block explorer installation.

`$ npm i -g @alethio/cms-plugin-tool`
`$ cd <explorer-checkout-folder>`
```
$ acp link ../explorer-core-plugins/packages/eth-common \
    ../explorer-core-plugins/packages/eth-extended \
    ../explorer-core-plugins/packages/eth-lite
```

## Running the tests

`npm test` (or `npm run test-coverage` to generate code coverage as well).

Test coverage is written to `./coverage` in HTML and LCOV formats.

## Release process

1. Changes are proposed via pull requests and merged into master after they obtain approval.
2. Releases are made from master, by a maintainer, collecting changes that were made since the previous release.
3. A new independent version is chosen for plugins that were affected, according to [semver](https://semver.org/).
4. Changes are documented in CHANGELOG files, found in each package folder, committed and pushed to master.
5. Publish to npm, with implicit git tags and corresponding release (see below).

### Publishing to npm

This repo uses [lerna](https://github.com/lerna/lerna). Because the source code is shared between packages, lerna will not automatically detect which packages were changed. The following commands need to be executed:

1. `npx lerna version --force-publish=<explicitly_changed_package_names>`

e.g. `npx lerna version --force-publish=@alethio/explorer-plugin-eth-common,@alethio/explorer-plugin-eth-lite`

2. `npx lerna publish from-git`
