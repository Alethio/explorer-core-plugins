// tslint:disable:no-string-literal
import { BigNumber } from "app/util/BigNumber";
import { ITxReceipt } from "app/eth-lite/data/tx/receipt/ITxReceipt";

export class TxReceiptReader {
    read(receipt: any) {
        let tx: ITxReceipt = {
            blockHash: receipt["blockHash"],
            contractAddress: receipt["contractAddress"] || void 0,
            cumulativeGasUsed: new BigNumber(receipt["cumulativeGasUsed"]),
            gasUsed: new BigNumber(receipt["gasUsed"]),
            logsBloom: receipt["logsBloom"],
            status: receipt["status"] !== void 0 ? receipt["status"] : true
        };
        return tx;
    }
}
