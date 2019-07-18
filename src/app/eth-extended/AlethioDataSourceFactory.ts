import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { BlockDetailsStoreFactory } from "app/eth-extended/data/block/details/BlockDetailsStoreFactory";
import { BlockValueStoreFactory } from "app/eth-extended/data/block/value/BlockValueStoreFactory";
import { TxDetailsStoreFactory } from "app/eth-extended/data/tx/details/TxDetailsStoreFactory";
import { TokenTransferStoreFactory } from "app/eth-extended/data/token/transfer/TokenTransferStoreFactory";
import { TxGraphStoreFactory } from "app/eth-extended/data/tx/graph/TxGraphStoreFactory";
import { LogEventsStoreFactory } from "app/eth-extended/data/logEvents/LogEventsStoreFactory";
import { CmLiteStoreFactory } from "app/eth-extended/data/contractMsg/lite/CmLiteStoreFactory";
import { CmDetailsStoreFactory } from "app/eth-extended/data/contractMsg/details/CmDetailsStoreFactory";
import { PricesStoreFactory } from "app/eth-extended/data/prices/PricesStoreFactory";
import { UncleDetailsStoreFactory } from "app/eth-extended/data/uncle/UncleDetailsStoreFactory";
import { TxPendingCountsStoreFactory } from "./data/account/pendingTxsCount/TxPendingCountsStoreFactory";
import { AccountDetailsStoreFactory } from "./data/account/details/AccountDetailsStoreFactory";
import { AccountBalanceStoreFactory } from "./data/account/balance/AccountBalanceStoreFactory";
import { ContractDetailsStoreFactory } from "./data/contract/ContractDetailsStoreFactory";
import { TxLiteByAccountStoreFactory } from "./data/tx/lite/byAccount/TxLiteByAccountStoreFactory";
import { SearchFactory } from "app/eth-extended/data/search/SearchFactory";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { Deepstream } from "app/util/network/Deepstream";
import { PendingTxWatcher } from "app/eth-extended/adapter/watcher/PendingTxWatcher";
import { ILogger } from "plugin-api/ILogger";
import { PendingPoolStore } from "app/eth-extended/module/dashboard/charts/data/PendingPoolStore";
import { NetstatsStore } from "app/eth-extended/module/dashboard/charts/data/NetstatsStore";
import { PropagationChartStore } from "app/eth-extended/module/dashboard/charts/data/PropagationChartStore";
import { BlockTxTimeInPoolStore } from "app/eth-extended/data/block/txTimeInPool/BlockTxTimeInPoolStore";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";
import { Web3Factory } from "app/eth-extended/Web3Factory";
import { ContractWeb3ApiFactory } from "./data/contract/ContractWeb3ApiFactory";
import { PricesStore } from "app/eth-extended/data/prices/PricesStore";

export class AlethioDataSourceFactory {
    create(config: EthExtendedPluginConfig, logger: ILogger) {
        let deepstream = new Deepstream(config.getDeepstreamConfig());
        let pendingTxWatcher = new PendingTxWatcher(deepstream, logger);

        let blockStateStore = new BlockStateStore();
        let blockDetailsStore = new BlockDetailsStoreFactory(config).create();
        let blockTxTimeInPoolStore = new BlockTxTimeInPoolStore();
        let blockValueStore = new BlockValueStoreFactory(config).create();
        let txDetailsStore = new TxDetailsStoreFactory(config, logger).create(deepstream);
        let tokenTransferStore = new TokenTransferStoreFactory(config).create();
        let txGraphStore = new TxGraphStoreFactory(config).create();
        let logEventsStore = new LogEventsStoreFactory(config).create();
        let cmLiteStore = new CmLiteStoreFactory(config).create();
        let cmDetailsStore = new CmDetailsStoreFactory(config, logger).create();

        let pricesApiUrl = config.getPricesApiUrl();
        let pricesStore: PricesStore | undefined;
        if (config.isUsdPricesEnabled() && pricesApiUrl) {
            pricesStore = new PricesStoreFactory(pricesApiUrl).create();
        }

        let uncleDetailsStore = new UncleDetailsStoreFactory(config).create();
        let txPartialCountsByAccountStore = new TxPendingCountsStoreFactory().create(deepstream);
        let accountDetailsStore = new AccountDetailsStoreFactory(config).create();
        let accountBalanceStore = new AccountBalanceStoreFactory(config).create();
        let contractDetailsStore = new ContractDetailsStoreFactory(config, logger).create();
        let txLiteByAccountStore = new TxLiteByAccountStoreFactory(config).create(deepstream, blockStateStore);

        let search = new SearchFactory(config, logger).create(blockStateStore, deepstream);

        let pendingPoolStore = new PendingPoolStore();
        let netstatsStore = new NetstatsStore();
        let propagationChartStore = new PropagationChartStore();

        let web3Factory = new Web3Factory(config);
        let contractWeb3Api = (new ContractWeb3ApiFactory(web3Factory)).create();

        let alethioDataSource = new AlethioDataSource(
            deepstream,
            logger,
            pendingTxWatcher,
            web3Factory,
            contractWeb3Api,
            {
                blockStateStore,
                pendingPoolStore,
                propagationChartStore,
                netstatsStore,
                blockDetailsStore,
                blockValueStore,
                blockTxTimeInPoolStore,
                txDetailsStore,
                tokenTransferStore,
                cmLiteStore,
                cmDetailsStore,
                pricesStore,
                uncleDetailsStore,
                accountDetailsStore,
                accountBalanceStore,
                contractDetailsStore,
                txLiteByAccountStore,
                txPendingCountsByAccountStore: txPartialCountsByAccountStore,
                txGraphStore,
                logEventsStore,
                search
            }
        );

        return alethioDataSource;
    }
}
