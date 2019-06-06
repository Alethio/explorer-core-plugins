import { TokenTransferByTxStore } from "app/eth-extended/data/token/transfer/byTx/TokenTransferByTxStore";
import { TokenTransferByCmStore } from "app/eth-extended/data/token/transfer/byCm/TokenTransferByCmStore";

export class TokenTransferStore {
    constructor(
        private byTx: TokenTransferByTxStore,
        private byCm: TokenTransferByCmStore
    ) {

    }

    fetchByTx(txHash: string) {
        return this.byTx.fetch(txHash);
    }

    fetchByCm(txHash: string, txValidationIndex: number) {
        return this.byCm.fetch(txHash, txValidationIndex);
    }
}
