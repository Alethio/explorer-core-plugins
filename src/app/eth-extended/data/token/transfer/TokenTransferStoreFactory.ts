import { TokenTransferByTxStore } from "app/eth-extended/data/token/transfer/byTx/TokenTransferByTxStore";
import { FifoCache } from "app/util/cache/FifoCache";
import { ITokenTransfer } from "app/eth-extended/data/token/transfer/ITokenTransfer";
import { TokenTransferByTxApi } from "app/eth-extended/data/token/transfer/byTx/TokenTransferByTxApi";
import { HttpApi } from "app/eth-extended/data/HttpApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { TokenResponseReader } from "app/eth-extended/data/token/transfer/TokenResponseReader";
import { TokenTransferReader } from "app/eth-extended/data/token/transfer/TokenTransferReader";
import { TokenInfoReader } from "app/eth-extended/data/token/TokenInfoReader";
import { TokenTransferStore } from "app/eth-extended/data/token/transfer/TokenTransferStore";
import { TokenTransferByCmStore } from "app/eth-extended/data/token/transfer/byCm/TokenTransferByCmStore";
import { TokenTransferByCmApi } from "app/eth-extended/data/token/transfer/byCm/TokenTransferByCmApi";
import { AlethioDataSourceConfig } from "app/eth-extended/AlethioDataSourceConfig";

const BY_TX_CACHE_SIZE = 100;
const BY_CM_CACHE_SIZE = 100;

export class TokenTransferStoreFactory {
    constructor(private appConfig: AlethioDataSourceConfig) {

    }

    create() {
        let httpApi = new HttpApi(new HttpRequest());
        let tokenResponseReader = new TokenResponseReader(
            new TokenTransferReader(),
            new TokenInfoReader()
        );

        let byTx = new TokenTransferByTxStore(
            new FifoCache<string, ITokenTransfer[]>(BY_TX_CACHE_SIZE),
            new TokenTransferByTxApi(
                httpApi,
                tokenResponseReader,
                this.appConfig.getTxTokensApiUrlMask()
            )
        );

        let byCm = new TokenTransferByCmStore(
            new FifoCache<string, ITokenTransfer[]>(BY_CM_CACHE_SIZE),
            new TokenTransferByCmApi(
                httpApi,
                tokenResponseReader,
                this.appConfig.getCmTokensApiUrlMask()
            )
        );

        return new TokenTransferStore(byTx, byCm);
    }
}
