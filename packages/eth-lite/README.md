# @alethio/explorer-plugin-eth-lite

Alethio Explorer plugin that fetches data via Web3, directly from an ETH node. Used by [ethereum-lite-explorer](https://github.com/Alethio/ethereum-lite-explorer). Works together with the @alethio/explorer-plugin-eth-common core plugin.

See [cms-plugin-tool](https://github.com/Alethio/cms-plugin-tool) for install instructions.

## Configuration

The structure of the config object is described [here](../../src/app/eth-lite/EthLitePluginConfig.ts).

See [config.sample.json](config.sample.json) for an example.

Refer to [pages.sample.json](pages.sample.json) for a `pages` structure example.

## Exported entities

### Pages

| Page URI | Created context shape | Module slots | Description | Implementation |
| --- | --- | --- | --- | --- |
| page://aleth.io/dashboard | {} | content | Main dashboard page | [dashboardPage](../../src/app/shared/page/dashboard/dashboardPage.ts) |
| page://aleth.io/uncle | { blockNumber, uncleIndex } | content | Uncle details page | [unclePage](../../src/app/eth-lite/page/unclePage.tsx) |

### Context

| Context URI | Generated context shape | Placed in context | Description | Implementation |
| --- | --- | --- | --- | --- |
| context://aleth.io/lite/tx/parentBlock | { txHash, blockNumber } | { txHash } | Adds the parent block to the current TX context | [txParentBlockContext](../../src/app/eth-lite/context/txParentBlockContext.ts) |

### Modules

| Module URI | Context shape | Module slots | Description | Implementation |
| --- | --- | --- | --- | --- |
| module://aleth.io/lite/block/details | { blockNumber } | confirmations, txs, extraData } | Block data fields | [blockDetailsModule](../../src/app/eth-lite/module/block/blockDetails/blockDetailsModule.ts) |
| module://aleth.io/lite/block/txs | { blockNumber } | N/A | Transactions in given block, in two visualizations (grid and heat map) | [blockTxsModule](../../src/app/eth-lite/module/block/blockTxs/blockTxsModule.ts) |
| module://aleth.io/lite/uncle/details | { blockNumber, uncleIndex } | N/A | Uncle data fields | [uncleDetailsModule](../../src/app/shared/module/uncle/uncleDetails/uncleDetailsModule.ts) |
| module://aleth.io/lite/tx/details | { txHash } | blockConfirmations | Transaction data fields | [txDetailsModule](../../src/app/eth-lite/module/tx/txDetails/txDetailsModule.ts) |
| module://aleth.io/lite/account/details | { accountHash } | N/A | Basic account data | [accountDetailsModule](../../src/app/eth-lite/module/account/accountDetailsModule.ts) |
| module://aleth.io/lite/account/contract | { accountHash } | N/A | Contract data (creation code etc.) | [accountContractModule](../../src/app/eth-lite/module/account/accountContractModule.ts) |

### Data Adapters

| Adapter URI | Context shape | Return type | Description | Implementation |
| --- | --- | --- | --- | --- |
| adapter://aleth.io/search/v2 | {} | [ISearch](../../src/app/shared/data/search/ISearch.ts) | Returns a search provider | [SearchAdapter](../../src/app/shared/adapter/SearchAdapter.ts) |
| adapter://aleth.io/block/latestNo | {} | number | Returns the latest block number on the chain | [LatestBlockNumberAdapter](../../src/app/shared/adapter/block/LatestBlockNumberAdapter.ts) |
| adapter://aleth.io/block/basic | { blockNumber } | [IBlockBasicInfo](../../src/app/shared/data/block/IBlockBasicInfo.ts) | Adapter for basic block data | [BlockBasicInfoAdapter](../../src/app/shared/adapter/block/BlockBasicInfoAdapter.ts) |
| adapter://aleth.io/lite/block/details | { blockNumber } | [IBlockDetails](../../src/app/eth-lite/data/block/details/IBlockDetails.ts) | Provides detailed block data specific to lite explorer | [BlockDetailsAdapter](../../src/app/eth-lite/adapter/block/BlockDetailsAdapter.ts) |
| adapter://aleth.io/block-range/summary | { rangeStart, rangeEnd, blockNumber } | Array<[IBlockTxCount](../../src/app/shared/data/block/value/IBlockTxCount.ts) \| undefined>| TX counts per block for a range of blocks | [BlockListAdapter](../../src/app/shared/adapter/block/BlockListAdapter.ts) |
| adapter://aleth.io/block/confirmations | { blockNumber } | [IBlockConfirmations](../../src/app/shared/adapter/block/BlockConfirmationsAdapter.ts) | Info about number of confirmations for a given block | [BlockConfirmationsAdapter](../../src/app/shared/adapter/block/BlockConfirmationsAdapter.ts) |
| adapter://aleth.io/lite/uncle/details | { blockNumber, uncleIndex } | [IUncleDetails](../../src/app/eth-lite/data/uncle/IUncleDetails.ts) | Uncle data fields | [UncleDetailsAdapter](../../src/app/eth-lite/adapter/uncle/UncleDetailsAdapter.ts) |
| adapter://aleth.io/lite/tx/details | { txHash } | [ITxDetails](../../src/app/eth-lite/data/tx/details/ITxDetails.ts) | Transaction data fields | [TxDetailsAdapter](../../src/app/eth-lite/adapter/tx/TxDetailsAdapter.ts) |
| adapter://aleth.io/lite/tx/receipt | { txHash } | [ITxReceipt](../../src/app/eth-lite/data/tx/receipt/ITxReceipt.ts) | Tx receipt data | [TxReceiptAdapter](../../src/app/eth-lite/adapter/tx/TxReceiptAdapter.ts) |
| adapter://aleth.io/lite/account/details | { accountHash } | [IAccountDetails](../../src/app/eth-lite/data/account/IAccountDetails.ts) | Basic account data | [AccountDetailsAdapter](../../src/app/eth-lite/adapter/account/AccountDetailsAdapter.ts) |
| adapter://aleth.io/lite/account/balance | { accountHash } | BigNumber | Total account balance in ETH |[AccountBalanceAdapter](../../src/app/eth-lite/adapter/account/AccountBalanceAdapter.ts) |

