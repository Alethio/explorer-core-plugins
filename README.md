# explorer-core-plugins

Core plugins for Alethio Explorer

## Installation

### Linux, MacOS

`npm install`

### Windows

`npm --add-python-to-path='true' --debug install --global windows-build-tools`
`npm install` just as with Linux

## Project structure

Each plugin has its own folder in `packages/<pluginName>`.
The project contains 3 core plugins that provide basic explorer functionality and which share the same codebase, dependencies and build process. Each plugin has a folder in `packages/<pluginName>`, from which a separat npm package is created:

- `eth-common` - common pages and modules that should be available regardless of what data source is used
- `eth-extended` - pages, modules and data sources specific to the "full" explorer. This plugin uses the Alethio explorer API endpoints and a Deepstream connection
- `eth-lite` - a "lite" explorer plugin, using `web3` as a data source. It only offers what can be directly fetched from an eth node, without the aggregations provided by the Alethio API.

## Development

`npm run watch` or `npm run build-dev`.
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
