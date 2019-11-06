import { TxType } from "./TxType";

const txTypeMap = new Map<string, TxType>()
    .set("CallTx", TxType.Call)
    .set("ValueTx", TxType.Value)
    .set("CreateTx", TxType.Create)
    .set("Tx", TxType.Unknown);

export function readTxType(type: string) {
    if (!txTypeMap.has(type)) {
        throw new Error(`Unhandled TX type "${type}"`);
    }
    return txTypeMap.get(type)!;
}
