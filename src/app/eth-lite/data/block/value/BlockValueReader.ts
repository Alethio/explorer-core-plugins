// tslint:disable:no-string-literal
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";

export class BlockValueReader {
    read(data: any) {
        if (typeof data !== "object") {
            throw new Error(`Expected an object but got "${typeof data}"`);
        }
        let blockValue: IBlockTxCount = {
            id: data["id"],
            transactionCount: Number(data["transactionCount"])
        };

        return blockValue;
    }
}
