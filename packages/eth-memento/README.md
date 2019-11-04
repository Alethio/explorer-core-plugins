# @alethio/explorer-plugin-eth-memento

Alethio Explorer plugin that fetches data from lite pipeline (Memento). Mainly used by [ethereum-lite-explorer](https://github.com/Alethio/ethereum-lite-explorer). Works together with the @alethio/explorer-plugin-eth-common core plugin.

See [cms-plugin-tool](https://github.com/Alethio/cms-plugin-tool) for install instructions.

## Configuration

The structure of the config object is described [here](../../src/app/eth-memento/EthMementoPluginConfig.ts).

See [config.sample.json](config.sample.json) for an example.

Refer to [pages.sample.json](pages.sample.json) for a `pages` structure example. The example contains only the `account` page
with the usage of the only module exported by this plugin.

## Exported entities

### Modules

| Module URI | Context shape | Module slots | Description | Implementation |
| --- | --- | --- | --- | --- |
| module://aleth.io/memento/account/txs | { accountHash } | N/A | Accordion with transactions | [accountTxsModule](../../src/app/eth-memento/module/account/summary/accountTxsModule.ts) |
