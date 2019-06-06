import { IDataAdapter } from "plugin-api/IDataAdapter";
import { ITxContext } from "app/shared/context/ITxContext";
import { txContextType } from "app/shared/context/txContextType";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";
import { ITxReceipt } from "app/eth-lite/data/tx/receipt/ITxReceipt";

export class TxReceiptAdapter implements IDataAdapter<ITxContext, ITxReceipt> {
    contextType = txContextType;

    constructor(private dataSource: Web3DataSource) {

    }

    async load(context: ITxContext) {
        return await this.dataSource.stores.txReceiptStore.fetch(context.txHash);
    }
}
