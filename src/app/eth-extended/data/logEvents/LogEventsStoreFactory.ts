import { FifoCache } from "app/util/cache/FifoCache";
import { HttpApi } from "app/eth-extended/data/HttpApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { LogEventsReader } from "app/eth-extended/data/logEvents/LogEventsReader";
import { LogEventsByTxStore } from "app/eth-extended/data/logEvents/byTx/LogEventsByTxStore";
import { ILogEvent } from "app/eth-extended/data/logEvents/ILogEvent";
import { LogEventsByTxApi } from "app/eth-extended/data/logEvents/byTx/LogEventsByTxApi";
import { LogEventsStore } from "app/eth-extended/data/logEvents/LogEventsStore";
import { LogEventsByCmStore } from "app/eth-extended/data/logEvents/byCm/LogEventsByCmStore";
import { LogEventsByCmApi } from "app/eth-extended/data/logEvents/byCm/LogEventsByCmApi";
import { AlethioDataSourceConfig } from "app/eth-extended/AlethioDataSourceConfig";

const BY_TX_CACHE_SIZE = 100;
const BY_CM_CACHE_SIZE = 100;

export class LogEventsStoreFactory {
    constructor(private appConfig: AlethioDataSourceConfig) {

    }

    create() {
        let httpApi = new HttpApi(new HttpRequest());
        let tokenTransferReader = new LogEventsReader();

        let byTx = new LogEventsByTxStore(
            new FifoCache<string, ILogEvent[]>(BY_TX_CACHE_SIZE),
            new LogEventsByTxApi(
                httpApi,
                tokenTransferReader,
                this.appConfig.getTxLogEventsApiUrlMask()
            )
        );

        let byCm = new LogEventsByCmStore(
            new FifoCache<string, ILogEvent[]>(BY_CM_CACHE_SIZE),
            new LogEventsByCmApi(
                httpApi,
                tokenTransferReader,
                this.appConfig.getCmLogEventsApiUrlMask()
            )
        );

        return new LogEventsStore(byTx, byCm);
    }
}
