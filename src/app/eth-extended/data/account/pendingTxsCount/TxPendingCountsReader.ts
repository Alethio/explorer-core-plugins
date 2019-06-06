// tslint:disable:no-string-literal
import { ITxPendingCountsResult } from "./ITxPendingCountsResult";

export class TxPendingCountsReader {
    read(data: any) {
        let pendingResult: ITxPendingCountsResult = {
            inbound: Number(data["pending"]["inbound"]),
            outbound: Number(data["pending"]["outbound"])
        };
        return pendingResult;
    }
}
