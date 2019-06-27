# @alethio/explorer-plugin-eth-common

Alethio Explorer plugin with common ETH modules and pages. It works together with a core plugin that provides a data source (@alethio/explorer-plugin-eth-lite or @alethio/explorer-plugin-eth-extended).

See [cms-plugin-tool](https://github.com/Alethio/cms-plugin-tool) for install instructions.

## Configuration

The plugin accepts the following configuration options:
```ts
interface IConfig {
    /** (Optional) Used by Alethio API toolbar/topbar icons */
    alethioApiUrl?: string;
    /** (Optional) Used by Alethio Monitoring toolbar/topbar icons */
    alethioMonitoringUrl?: string;
    /** (Optional) Used by Alethio Reports toolbar/topbar icons */
    alethioReportsUrl?: string;
    /** (Optional) Used by EthStats toolbar/topbar icons */
    ethstatsUrl?: string;
    /** (Optional) Used by Alethio company website toolbar/topbar icons */
    companyUrl?: string;
}
```

See [config.sample.json](config.sample.json) for an example.

Refer to [eth-extended/pages.sample.json](../eth-extended/pages.sample.json) or [eth-lite/pages.sample.json](../eth-lite/pages.sample.json) for a `pages` structure example.

## Exported entities

### Pages

| Page URI | Created context shape | Module slots | Description | Implementation |
| --- | --- | --- | --- | --- |
| page://aleth.io/block | { blockNumber } | sidebar, content | Display block details | [blockPage](../../src/app/eth-common/page/block/blockPage.tsx) |
| page://aleth.io/tx | { txHash } | sidebar, content | Display transaction details | [txPage](../../src/app/eth-common/page/tx/txPage.tsx) |
| page://aleth.io/account | { accountHash } | identicon, top, balance, bottom | Ethereum address details | [accountPage](../../src/app/eth-common/page/account/accountPage.tsx) |

### Contexts

| Context URI | Generated context shape | Placed in context | Description | Implementation |
| --- | --- | --- | --- | --- |
| context://aleth.io/block/list | { rangeStart, rangeEnd, blockNumber } | { blockNumber } | Selects a range of blocks around a selected block | [blockListContext](../../src/app/eth-common/context/blockListContext.ts) |
| context://aleth.io/block/latest | { blockNumber } | N/A | Block context that syncs to the latest block on the chain | [latestBlockContext](../../src/app/eth-common/context/latestBlockContext.ts) |
| context://aleth.io/dashboard/latestBlockRange | { rangeStart, rangeEnd } | N/A | Selects a range of blocks up to the latest block on the chain | [latestBlockRangeContext](../../src/app/eth-common/context/latestBlockRangeContext.ts) |

### Modules

| Module URI | Context shape | Module slots | Description | Implementation | Options |
| --- | --- | --- | --- | --- | --- |
| module://aleth.io/block/list | { rangeStart, rangeEnd, blockNumber } | N/A | Chart for block sidebar, showing number of txs per block | [blockListModule](../../src/app/eth-common/module/block/blockList/blockListModule.ts) | N/A |
| module://aleth.io/block/confirmations | { blockNumber } | N/A | Shows real-time number of block confirmations | [blockConfirmationsModule](../../src/app/eth-common/module/block/blockConfirmationsModule.ts) | N/A |
| module://aleth.io/tx/list | { txHash } | N/A | Sidebar chart showing the current transaction in the context of the parent block | [txListModule](../../src/app/eth-common/module/tx/txList/txListModule.ts) | N/A |
| module://aleth.io/account/identicon | { accountHash } | N/A | Renders an identicon for the given account hash | [accountIdenticonModule](../../src/app/eth-common/module/account/identicon/accountIdenticonModule.ts) | N/A |
| module://aleth.io/dashboard/network | N/A | N/A | Shows the current network name and an optional dropdown for switching to other networks. | [networkModule](../../src/app/eth-common/module/dashboard/networkModule.tsx) | [INetworkModuleOptions](../../src/app/eth-common/module/dashboard/INetworkModuleOptions.tsx) |
| module://aleth.io/search | N/A | N/A | Search widget | [searchModule](../../src/app/eth-common/module/search/searchModule.ts) | N/A |
| module://aleth.io/dashboard/charts | N/A | content | Layout wrapper for charts on dashboard page | [chartsModule](../../src/app/eth-common/module/dashboard/chartsModule.ts) | N/A |
| module://aleth.io/dashboard/blocksChart | { rangeStart, rangeEnd } | children | Chart showing tx counts for a range of blocks. Exposes slot for adding content under it | [blocksChartModule](../../src/app/eth-common/module/dashboard/blocksChart/blocksChartModule.ts) | N/A |
| module://aleth.io/dashboard/latestBlockInfo | { blockNumber } | N/A | Shows a line of basic block details, specifically for the latest block | [latestBlockInfoModule](../../src/app/eth-common/module/block/latestBlockInfo/latestBlockInfoModule.ts) | N/A |
| module://aleth.io/toolbar/ethstats | N/A | N/A | EthStats 2.0 product icon (left-side toolbar item) | [ethstatsModule](../../src/app/eth-common/module/toolbar/ethstatsModule.tsx) | N/A |
| module://aleth.io/toolbar/alethioApi | N/A | N/A | Alethio API product icon (left-side toolbar item) | [alethioApiModule](../../src/app/eth-common/module/toolbar/alethioApiModule.tsx) | N/A |
| module://aleth.io/topbar/alethioApi | N/A | N/A | Alethio API product icon (mobile topbar item) | [alethioApiModule](../../src/app/eth-common/module/topbar/alethioApiModule.tsx) | N/A |
| module://aleth.io/toolbar/alethioMonitoring | N/A | N/A | Alethio Monitoring product icon (left-side toolbar item) | [alethioMonitoringModule](../../src/app/eth-common/module/toolbar/alethioMonitoringModule.tsx) | N/A |
| module://aleth.io/topbar/alethioMonitoring | N/A | N/A | Alethio Monitoring product icon (mobile topbar item) | [alethioMonitoringModule](../../src/app/eth-common/module/topbar/alethioMonitoringModule.tsx) | N/A |
| module://aleth.io/toolbar/alethioReports | N/A | N/A | Alethio Reports product icon (left-side toolbar item) | [alethioReportsModule](../../src/app/eth-common/module/toolbar/alethioReportsModule.tsx) | N/A |
| module://aleth.io/topbar/alethioReports | N/A | N/A | Alethio Reports product icon (mobile topbar item) | [alethioReportsModule](../../src/app/eth-common/module/topbar/alethioReportsModule.tsx) | N/A |
| module://aleth.io/toolbar/company | N/A | N/A | Alethio company website link (left-side toolbar item) | [alethioCompanyModule](../../src/app/eth-common/module/toolbar/alethioCompanyModule.tsx) | N/A |
| module://aleth.io/topbar/company | N/A | N/A | Alethio company website link (mobile topbar item) | [alethioCompanyModule](../../src/app/eth-common/module/topbar/alethioCompanyModule.tsx) | N/A |
| module://aleth.io/toolbar/feedback | N/A | N/A | Hotjar feedback icon (left-side toolbar item) | [toolbarFeedbackModule](../../src/app/eth-common/module/toolbar/feedback/toolbarFeedbackModule.ts) | N/A |
| module://aleth.io/topbar/feedback | N/A | N/A | Hotjar feedback icon (mobile topbar item) | [topbarFeedbackModule](../../src/app/eth-common/module/toolbar/feedback/topbarFeedbackModule.ts) | N/A |
| module://aleth.io/toolbar/search | N/A | N/A | Search icon (left-side toolbar item) | [toolbarSearchModule](../../src/app/eth-common/module/search/toolbarSearchModule.ts) | N/A |
| module://aleth.io/topbar/search | N/A | N/A | Search icon (mobile topbar item) | [topbarSearchModule](../../src/app/eth-common/module/search/topbarSearchModule.ts) | N/A |
