import { TxGraphApi } from "app/eth-extended/data/tx/graph/TxGraphApi";
import { TxGraphStore } from "app/eth-extended/data/tx/graph/TxGraphStore";
import { HttpApi } from "app/eth-extended/data/HttpApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { AlethioDataSourceConfig } from "app/eth-extended/AlethioDataSourceConfig";

export class TxGraphStoreFactory {
    constructor(private appConfig: AlethioDataSourceConfig) {

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
