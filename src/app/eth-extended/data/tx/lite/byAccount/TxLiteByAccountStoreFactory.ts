import { FifoCache } from "app/util/cache/FifoCache";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { HttpApi } from "app/shared/data/HttpApi";
import { Deepstream } from "app/util/network/Deepstream";
import { TxLiteByAccountStore } from "app/eth-extended/data/tx/lite/byAccount/TxLiteByAccountStore";
import { ITxLiteByAccountMined } from "app/eth-extended/data/tx/lite/byAccount/mined/ITxLiteByAccountMined";
import { TxLiteByAccountMinedApi } from "app/eth-extended/data/tx/lite/byAccount/mined/TxLiteByAccountMinedApi";
import { TxLiteByAccountMinedReader } from "./mined/TxLiteByAccountMinedReader";
import { TxLiteByAccountMinedStore } from "./mined/TxLiteByAccountMinedStore";
import { TxLiteByAccountPendingStore } from "./pending/TxLiteByAccountPendingStore";
import { TxLiteByAccountPendingApi } from "app/eth-extended/data/tx/lite/byAccount/pending/TxLiteByAccountPendingApi";
import { BlockStateStore } from "app/shared/data/BlockStateStore";
import { TxLiteByAccountPendingReader as TxLiteByAccountPendingReader } from "./pending/TxLiteByAccountPendingReader";
import { DsRpcApi } from "app/eth-extended/data/DsRpcApi";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

const API_CACHE_SIZE = 5;

export class TxLiteByAccountStoreFactory {
    constructor(private appConfig: EthExtendedPluginConfig) {

    }

    create(deepstream: Deepstream, blockStateStore: BlockStateStore) {
        let minedStore = new TxLiteByAccountMinedStore(
            new FifoCache<string, ITxLiteByAccountMined[]>(API_CACHE_SIZE),
            new TxLiteByAccountMinedApi(
                new HttpApi(new HttpRequest()),
                new TxLiteByAccountMinedReader(),
                this.appConfig.getAccountTxApiUrlMask()
            )
        );
        let pendingStore = new TxLiteByAccountPendingStore(
            new TxLiteByAccountPendingApi(
                new DsRpcApi(deepstream),
                new TxLiteByAccountPendingReader()
            )
        );
        return new TxLiteByAccountStore(minedStore, pendingStore, blockStateStore);
    }
}
