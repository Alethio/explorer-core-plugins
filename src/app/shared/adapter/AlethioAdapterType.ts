export enum AlethioAdapterType {
    BlockBasicInfo = "adapter://aleth.io/block/basic",

    BlockDetailsLite = "adapter://aleth.io/lite/block/details",
    BlockDetailsExtended = "adapter://aleth.io/extended/block/details",

    EthPrices = "adapter://aleth.io/prices/latest",
    BlockConfirmations = "adapter://aleth.io/block/confirmations",
    BlockList = "adapter://aleth.io/block-range/summary",
    LatestBlockNumber = "adapter://aleth.io/block/latestNo",

    UncleDetailsLite = "adapter://aleth.io/lite/uncle/details",
    UncleDetailsExtended = "adapter://aleth.io/extended/uncle/details",

    TxDetailsExtended = "adapter://aleth.io/extended/tx/details",
    TxDetailsLite = "adapter://aleth.io/lite/tx/details",

    AccountDetailsExtended = "adapter://aleth.io/extended/account/details",
    AccountDetailsLite = "adapter://aleth.io/lite/account/details",

    AccountBalanceExtendedLatest = "adapter://aleth.io/extended/account/balance?latest",
    AccountBalanceExtendedHist = "adapter://aleth.io/extended/account/balance?historical",

    Search = "adapter://aleth.io/search"
}
