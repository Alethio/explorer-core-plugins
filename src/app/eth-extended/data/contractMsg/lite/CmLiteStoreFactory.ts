import { CmLiteStore } from "app/eth-extended/data/contractMsg/lite/CmLiteStore";
import { CmLiteByTxStore } from "app/eth-extended/data/contractMsg/lite/byTx/CmLiteByTxStore";
import { FifoCache } from "app/util/cache/FifoCache";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { CmLiteByTxApi } from "app/eth-extended/data/contractMsg/lite/byTx/CmLiteByTxApi";
import { HttpApi } from "app/shared/data/HttpApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { CmLiteReader } from "app/eth-extended/data/contractMsg/lite/CmLiteReader";
import { CmLiteByCmStore } from "app/eth-extended/data/contractMsg/lite/byCm/CmLiteByCmStore";
import { CmLiteByCmApi } from "app/eth-extended/data/contractMsg/lite/byCm/CmLiteByCmApi";
import { CmLiteByAccountStore } from "app/eth-extended/data/contractMsg/lite/byAccount/CmLiteByAccountStore";
import { CmLiteByAccountApi } from "app/eth-extended/data/contractMsg/lite/byAccount/CmLiteByAccountApi";
import { CmLiteByAccountReader } from "./byAccount/CmLiteByAccountReader";
import { ICmLiteByAccount } from "app/eth-extended/data/contractMsg/lite/byAccount/ICmLiteByAccount";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

const BY_TX_CACHE_SIZE = 5;
const BY_CM_CACHE_SIZE = 5;
const BY_ACCOUNT_CACHE_SIZE = 5;

export class CmLiteStoreFactory {
    constructor(private appConfig: EthExtendedPluginConfig) {

    }

    create() {
        let httpApi = new HttpApi(new HttpRequest());
        let cmLiteReader = new CmLiteReader();

        let byTxStore = new CmLiteByTxStore(
            new FifoCache<string, ICmLite[]>(BY_TX_CACHE_SIZE),
            new CmLiteByTxApi(
                httpApi,
                cmLiteReader,
                this.appConfig.getTxContractMsgsApiUrlMask()
            )
        );
        let byCmStore = new CmLiteByCmStore(
            new FifoCache<string, ICmLite[]>(BY_CM_CACHE_SIZE),
            new CmLiteByCmApi(
                httpApi,
                cmLiteReader,
                this.appConfig.getContractMsgContractMsgsApiUrlMask()
            )
        );
        let byAccountStore = new CmLiteByAccountStore(
            new FifoCache<string, ICmLiteByAccount[]>(BY_ACCOUNT_CACHE_SIZE),
            new CmLiteByAccountApi(
                httpApi,
                new CmLiteByAccountReader(cmLiteReader),
                this.appConfig.getAccountCmApiUrlMask()
            )
        );
        return new CmLiteStore(byTxStore, byCmStore, byAccountStore);
    }
}
