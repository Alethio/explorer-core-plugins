import { CmLiteByTxStore } from "app/eth-extended/data/contractMsg/lite/byTx/CmLiteByTxStore";
import { CmLiteByCmStore } from "app/eth-extended/data/contractMsg/lite/byCm/CmLiteByCmStore";
import { CmLiteByAccountStore } from "app/eth-extended/data/contractMsg/lite/byAccount/CmLiteByAccountStore";

export class CmLiteStore {
    constructor(
        private byTx: CmLiteByTxStore,
        private byCm: CmLiteByCmStore,
        private byAccount: CmLiteByAccountStore
    ) {

    }

    fetchByTx(txHash: string) {
        return this.byTx.fetch(txHash);
    }

    fetchByCm(txHash: string, txValidationIndex: number) {
        return this.byCm.fetch(txHash, txValidationIndex);
    }

    getByAccountStore() {
        return this.byAccount;
    }
}
