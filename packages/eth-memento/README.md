# @alethio/explorer-plugin-eth-memento

Alethio Explorer plugin that fetches data from Memento. Mainly used- by [ethereum-lite-explorer](https://github.com/Alethio/ethereum-lite-explorer). Works together with the @alethio/explorer-plugin-eth-common core plugin.

See [cms-plugin-tool](https://github.com/Alethio/cms-plugin-tool) for install instructions.

## Configuration

The structure of the config object is described [here](../../src/app/eth-memento/EthMementoPluginConfig.ts).

See [config.sample.json](config.sample.json) for an example.

Refer to [pages.sample.json](pages.sample.json) for a `pages` structure example. The example contains only the `account` page
with the usage of the only module exported by this plugin.

## Exported entities

### Context

| Context URI | Generated context shape | Placed in context | Description | Implementation |
| --- | --- | --- | --- | --- |
| context://aleth.io/extended/tx/parentBlock | { txHash, blockNumber } | { txHash } | Adds the parent block to the current TX context | [txParentBlockContext](../../src/app/shared/context/txParentBlockContext.ts) |

### Modules

| Module URI | Context shape | Module slots | Description | Implementation |
| --- | --- | --- | --- | --- |
| module://aleth.io/block/basic | { blockNumber } | confirmations | Block basic data fields |[blockBasicModule](../../src/app/shared/module/block/blockBasic/blockBasicModule.tsx) | N/A |
| module://aleth.io/block/txs | { blockNumber } | N/A | Transactions in given block, in two visualizations (grid and heat map) | [blockTxsModule](../../src/app/shared/module/block/blockTxs/blockTxsModule.ts) | N/A |
| module://aleth.io/block/advanced | { blockNumber } | extraData | Block advanced data fields |[blockAdvancedModule](../../src/app/shared/module/block/blockAdvanced/blockAdvancedModule.tsx) | N/A |
| module://aleth.io/block/logs-bloom | { blockNumber } | N/A | Block logs bloom |[blockLogsBloomModule](../../src/app/shared/module/block/blockLogsBloom/blockLogsBloomModule.tsx) | N/A |
| module://aleth.io/tx/basic | { txHash } | blockConfirmations | Transaction basic data fields | [txBasicModule](../../src/app/shared/module/tx/txBasic/txBasicModule.tsx) | N/A |
| module://aleth.io/tx/advanced | { txHash } | N/A | Transaction advanced data fields | [txAdvancedModule](../../src/app/shared/module/tx/txAdvanced/txAdvancedModule.tsx) | N/A |
| module://aleth.io/tx/summary | { txHash } | N/A | Accordion with log events |[txSummaryModule](../../src/app/eth-memento/module/tx/txSummary/txSummaryModule.ts) | N/A |
| module://aleth.io/tx/payload" | { txHash } | N/A | Decoded tx payload | [txPayloadModule](../../src/app/shared/module/tx/txPayload/txPayloadModule.ts) | N/A |
| module://aleth.io/memento/account/txs | { accountHash } | N/A | Accordion with transactions | [accountTxsModule](../../src/app/eth-memento/module/account/accountTxsModule.ts) |

### Data Adapters

| Adapter URI | Context shape | Return type | Description | Implementation |
| --- | --- | --- | --- | --- |
| adapter://aleth.io/block/basic | { blockNumber } | [IBlockBasicInfo](../../src/app/shared/data/block/IBlockBasicInfo.ts) | Adapter for basic block data | [BlockBasicInfoAdapter](../../src/app/shared/adapter/block/BlockBasicInfoAdapter.ts) |
| adapter://aleth.io/full/block/details | { blockNumber } | [IBlockDetails](../../src/app/shared/data/block/details/IBlockDetails.ts) | Provides detailed block data specific to the full explorer | [BlockDetailsAdapter](../../src/app/shared/adapter/block/BlockDetailsAdapter.ts) |
| adapter://aleth.io/prices/latest | { blockNumber } | undefined | The price of ETH in USD at the latest block or undefined if disabled by configuration | [NullEthPriceAdapter](../../src/app/eth-memento/adapter/NullEthPriceAdapter.ts) |
| adapter://aleth.io/extended/tx/details | { txHash } | [ITxDetails](../../src/app/shared/data/tx/details/ITxDetails.ts) | Transaction data fields | [TxDetailsAdapter](../../src/app/eth-memento/adapter/tx/TxDetailsAdapter.ts) |
