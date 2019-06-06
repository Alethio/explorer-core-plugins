import { Deepstream } from "app/util/network/Deepstream";
import { TxStatus } from "app/eth-extended/data/tx/TxStatus";
import { ILogger } from "plugin-api/ILogger";

export interface IPendingTxHandler {
    (status: TxStatus): void;
}

/**
 * Watches for tx status changes from pending to mined
 */
export class PendingTxWatcher {
    private handlers = new Map<string, Set<IPendingTxHandler>>();
    private callbacks = new Map<string, (data: string) => any>();

    constructor(private deepstream: Deepstream, private logger: ILogger) {

    }

    watch(txHash: string, handler: IPendingTxHandler) {
        txHash = "0x" + txHash.replace(/^0x/, "");
        let existingHandlers: Set<IPendingTxHandler>;
        if (this.handlers.has(txHash)) {
            existingHandlers = this.handlers.get(txHash)!;
        } else {
            existingHandlers = new Set();
            this.handlers.set(txHash, existingHandlers);
        }
        existingHandlers.add(handler);

        if (!this.callbacks.has(txHash)) {
            this.callbacks.set(txHash, data => this.handleStatusChange(data, txHash));
        }
        this.deepstream.subscribeToEvent<string>(`pending:v2:tx:${txHash}`, this.callbacks.get(txHash)!)
            .catch(e => this.logger.error(e));
    }

    unwatch(txHash: string, handler: IPendingTxHandler) {
        let existingHandlers = this.handlers.get(txHash);
        if (!existingHandlers) {
            return;
        }
        if (existingHandlers.has(handler)) {
            existingHandlers.delete(handler);
        }
        if (!existingHandlers.size) {
            this.deepstream.unsubscribeFromEvent(`pending:v2:tx:${txHash}`, this.callbacks.get(txHash)!)
                .catch(e => this.logger.error(e));
            this.callbacks.delete(txHash);
            this.handlers.delete(txHash);
        }
    }

    private handleStatusChange = (data: string, txHash: string) => {
        let txStatus = this.readStatus(data);
        this.logger.info(`TX status change detected: txHash="${txHash}", status="${TxStatus[txStatus]}"`);
        this.handlers.get(txHash)!.forEach(handler => handler(txStatus));
    }

    private readStatus(data: string) {
        if (data === "pending") {
            return TxStatus.Pending;
        } else if (data === "mined") {
            return TxStatus.Mined;
        } else {
            throw new Error(`Unexpected tx status ${data}`);
        }
    }
}
