import { ITxBasicInfo } from "app/shared/data/tx/ITxBasicInfo";

export interface IBlockBasicInfo {
    /** Block number */
    id: number;
    /** Unix timestamp */
    creationTime?: number;
    uncleCount: number;
    transactions: ITxBasicInfo[];
}
