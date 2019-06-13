// tslint:disable:no-string-literal
import { readResultType } from "app/eth-extended/data/search/readResultType";
import { IResult } from "app/shared/data/search/IResult";
import { ResultType } from "app/shared/data/search/ResultType";
import { IUncleResultData } from "app/shared/data/search/result/IUncleResultData";
import { ITxResultData } from "app/shared/data/search/result/ITxResultData";
import { IBlockResultData } from "app/shared/data/search/result/IBlockResultData";

export class ResultReader {
    read(raw: any, query: string) {
        let type = readResultType(raw["entity"]);
        let result: IResult = {
            type,
            data: this.readExtraData(type, raw["data"], query)
        };

        return result;
    }

    private readExtraData(type: ResultType, data: any, query: string) {
        if (type === ResultType.Tx || type === ResultType.Uncle) {
            return {
                hash: "0x" + query.replace(/^0x/, "")
            } as IUncleResultData | ITxResultData;
        } else if (type === ResultType.Block) {
            return {
                blockNumber: data["number"]
            } as IBlockResultData;
        } else {
            return data;
        }
    }
}
