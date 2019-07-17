import { TxGraphApi } from "app/eth-extended/data/tx/graph/TxGraphApi";
import { TxGraphStore } from "app/eth-extended/data/tx/graph/TxGraphStore";
import { HttpApi } from "app/eth-extended/data/HttpApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

export class TxGraphStoreFactory {
    constructor(private appConfig: EthExtendedPluginConfig) {

    }

    create() {
        return new TxGraphStore(
            new TxGraphApi(
                new HttpApi(new HttpRequest()),
                this.appConfig.getTxGraphsApiUrlMask()
            )
        );
    }
}
