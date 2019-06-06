import { IBlockTxTimeInPool } from "app/eth-extended/data/block/txTimeInPool/IBlockTxTimeInPool";

// tslint:disable:no-string-literal

export class BlockTxTimeInPoolReader {
    read(data: any) {
        if (typeof data !== "object") {
            throw new Error(`Expected an object but got "${typeof data}"`);
        }
        let blockValue: IBlockTxTimeInPool = {
            id: data["number"],
            averageTimeInPool: Number(data["averageTimeInPool"])
        };

        return blockValue;
    }
}
