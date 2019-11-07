import { FifoCache } from "app/util/cache/FifoCache";
import { HttpApi } from "app/shared/data/HttpApi";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { LogEventsReader } from "app/shared/data/logEvents/LogEventsReader";
import { LogEventsByTxStore } from "app/shared/data/logEvents/byTx/LogEventsByTxStore";
import { ILogEvent } from "app/shared/data/logEvents/ILogEvent";
import { LogEventsByTxApi } from "app/shared/data/logEvents/byTx/LogEventsByTxApi";
import { LogEventsStore } from "app/eth-memento/data/logEvents/LogEventsStore";
import { EthMementoPluginConfig } from "app/eth-memento/EthMementoPluginConfig";

const BY_TX_CACHE_SIZE = 100;

export class LogEventsStoreFactory {
    constructor(private appConfig: EthMementoPluginConfig) {

    }

    create() {
        let httpApi = new HttpApi(new HttpRequest());
        let logEventsReader = new LogEventsReader();

        let byTx = new LogEventsByTxStore(
            new FifoCache<string, ILogEvent[]>(BY_TX_CACHE_SIZE),
            new LogEventsByTxApi(
                httpApi,
                logEventsReader,
                this.appConfig.getTxLogEventsApiUrlMask()
            )
        );

        return new LogEventsStore(byTx);
    }
}
