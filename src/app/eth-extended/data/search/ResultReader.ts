// tslint:disable:no-string-literal
import { readResultType } from "app/eth-extended/data/search/readResultType";
import { IResult } from "app/shared/data/search/IResult";
import { ResultType } from "app/shared/data/search/ResultType";
import { IUncleResultData } from "app/shared/data/search/result/IUncleResultData";
import { ITxResultData } from "app/shared/data/search/result/ITxResultData";

export class ResultReader {
    read(data: any, query: string) {
        let type = readResultType(data["entity"]);
        let result: IResult = {
            type,
            data: type === ResultType.Tx || type === ResultType.Uncle ? {
                hash: "0x" + query.replace(/^0x/, "")
            } as IUncleResultData | ITxResultData : data["data"]
        };

        return result;
    }
}
