import { CmType } from "app/eth-extended/data/contractMsg/CmType";

const cmTypeMap = new Map<string, CmType>()
    .set("ValueContractMsg", CmType.Value)
    .set("CreateContractMsg", CmType.Create)
    .set("SelfdestructContractMsg", CmType.SelfDestruct)
    .set("CallContractMsg", CmType.Call);

export function readCmType(type: string) {
    if (!cmTypeMap.has(type)) {
        throw new Error(`Unknown contract msg type "${type}"`);
    }
    return cmTypeMap.get(type)!;
}
