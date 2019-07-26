// tslint:disable:no-string-literal
import { ITxPendingCountsResult } from "./ITxPendingCountsResult";

export class TxPendingCountsReader {
    read(data: any) {
        let pendingResult: ITxPendingCountsResult = {
            inbound: Number(data["inbound"]),
            outbound: Number(data["outbound"])
        };
        return pendingResult;
    }
}
