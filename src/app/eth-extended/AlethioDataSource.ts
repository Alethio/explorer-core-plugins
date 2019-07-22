import { PendingPoolStore } from "app/eth-extended/module/dashboard/charts/data/PendingPoolStore";
import { PropagationChartStore } from "app/eth-extended/module/dashboard/charts/data/PropagationChartStore";
import { NetstatsStore } from "app/eth-extended/module/dashboard/charts/data/NetstatsStore";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { BlockDetailsStore } from "app/eth-extended/data/block/details/BlockDetailsStore";
import { BlockValueStore } from "app/shared/data/block/value/BlockValueStore";
import { BlockTxTimeInPoolStore } from "app/eth-extended/data/block/txTimeInPool/BlockTxTimeInPoolStore";
import { TxDetailsStore } from "app/eth-extended/data/tx/details/TxDetailsStore";
import { TokenTransferStore } from "app/eth-extended/data/token/transfer/TokenTransferStore";
import { CmLiteStore } from "app/eth-extended/data/contractMsg/lite/CmLiteStore";
import { CmDetailsStore } from "app/eth-extended/data/contractMsg/details/CmDetailsStore";
import { PricesStore } from "app/eth-extended/data/prices/PricesStore";
import { UncleDetailsStore } from "app/eth-extended/data/uncle/UncleDetailsStore";
import { AccountDetailsStore } from "app/eth-extended/data/account/details/AccountDetailsStore";
import { AccountBalanceStore } from "app/eth-extended/data/account/balance/AccountBalanceStore";
import { ContractDetailsStore } from "app/eth-extended/data/contract/ContractDetailsStore";
import { TxLiteByAccountStore } from "app/eth-extended/data/tx/lite/byAccount/TxLiteByAccountStore";
import { TxPendingCountsStore } from "app/eth-extended/data/account/pendingTxsCount/TxPendingCountsStore";
import { TxGraphStore } from "app/eth-extended/data/tx/graph/TxGraphStore";
import { LogEventsStore } from "app/eth-extended/data/logEvents/LogEventsStore";
import { Search } from "app/eth-extended/data/search/Search";
import { Deepstream } from "app/util/network/Deepstream";
import { ILogger } from "plugin-api/ILogger";
import { PropagationChartDataReader } from "./module/dashboard/charts/data/PropagationChartDataReader";
import { PendingTxWatcher } from "app/eth-extended/adapter/watcher/PendingTxWatcher";
import { when } from "mobx";
import { Web3Factory } from "app/eth-extended/Web3Factory";
import { ContractWeb3Api } from "app/eth-extended/data/contract/ContractWeb3Api";
import { BlockTxTimeInPoolReader } from "app/eth-extended/data/block/txTimeInPool/BlockTxTimeInPoolReader";
import { IDataSource } from "plugin-api/IDataSource";

interface IAlethioDataStores {
    pendingPoolStore: PendingPoolStore;
    propagationChartStore: PropagationChartStore;
    netstatsStore: NetstatsStore;
    blockDetailsStore: BlockDetailsStore;
    blockValueStore: BlockValueStore;
    blockTxTimeInPoolStore: BlockTxTimeInPoolStore;
    txDetailsStore: TxDetailsStore;
    tokenTransferStore: TokenTransferStore;
    cmLiteStore: CmLiteStore;
    cmDetailsStore: CmDetailsStore;
    pricesStore?: PricesStore;
    uncleDetailsStore: UncleDetailsStore;
    accountDetailsStore: AccountDetailsStore;
    accountBalanceStore: AccountBalanceStore;
    contractDetailsStore: ContractDetailsStore;
    txLiteByAccountStore: TxLiteByAccountStore;
    txPendingCountsByAccountStore: TxPendingCountsStore;
    txGraphStore: TxGraphStore;
    logEventsStore: LogEventsStore;
    blockStateStore: BlockStateStore;
    search: Search;
}

export class AlethioDataSource implements IDataSource {
    constructor(
        private deepstream: Deepstream,
        private logger: ILogger,
        public pendingTxWatcher: PendingTxWatcher,
        public web3Factory: Web3Factory,
        public contractWeb3Api: ContractWeb3Api,
        public stores: IAlethioDataStores
    ) {

    }

    async init() {
        // TODO: proper connection state handling (availability and fallback)
        await this.initDeepstream();
        await when(() => this.stores.blockStateStore.getLatest() !== void 0);
    }

    private async initDeepstream() {
        let { logger, deepstream } = this;
        let {
            blockStateStore, blockTxTimeInPoolStore, pendingPoolStore, propagationChartStore, netstatsStore
        } = this.stores;

        deepstream.onError.subscribe((error) => {
            logger.error("Deepstream error: " + JSON.stringify(error));
        });

        await deepstream.connect({
            /** Reconnect after 10, 20 and 30 seconds */
            reconnectIntervalIncrement: 10000,
            /** Try reconnecting every thirty seconds */
            maxReconnectInterval: 30000,
            /** We never want to stop trying to reconnect */
            maxReconnectAttempts: Infinity,
            /** Send heartbeats only once a minute */
            heartbeatInterval: 60000
        });

        deepstream.subscribeToRecord<any>("db/v2/lastBlock", (data) => {
            logger.info(`New latest block received: #${data.number}`);
            blockStateStore.setLatest(data.number);
        }).catch(e => logger.error(e));

        let blockTxTimeInPoolReader = new BlockTxTimeInPoolReader();
        deepstream.subscribeToRecord<any>("pending/v2/blockSummaries", data => {
            let latestValues = (data as any[]).map(item => blockTxTimeInPoolReader.read(item));
            blockTxTimeInPoolStore.setLatestValues(latestValues);
        }).catch(e => logger.error(e));

        deepstream.subscribeToRecord<any>("pending/v2/stats/perSecond", data => {
            pendingPoolStore.setEth(Number(data.eth));
            pendingPoolStore.setErc(Number(data.erc20));
        }).catch(e => logger.error(e));

        deepstream.subscribeToRecord<any>("pending/v2/stats/pool", data => {
            pendingPoolStore.setSize(Number(data.size));
        }).catch(e => logger.error(e));

        let propagationChartDataReader = new PropagationChartDataReader();
        deepstream.subscribeToRecord<any>("ethstats/chart/blockPropagationChartData", data => {
            let propagationData =
                (data["ethstats:blockPropagationChartData"]["ethstats:blockPropagationHistogramData"] as any[])
                    .map((item) => propagationChartDataReader.read(item)
                );
            propagationChartStore.setPropagationHistogramData(propagationData);
        }).catch(e => logger.error(e));

        deepstream.subscribeToRecord<any>("ethstats/stats/nodeCountData", data => {
            netstatsStore.setActiveNodesCount(Number(data["ethstats:nodeCountData"].active));
        }).catch(e => logger.error(e));
    }
}
