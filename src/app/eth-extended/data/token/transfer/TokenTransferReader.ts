// tslint:disable:no-string-literal
import { ITokenTransfer } from "app/eth-extended/data/token/transfer/ITokenTransfer";
import { ITokenInfo } from "app/eth-extended/data/token/ITokenInfo";
import { BigNumber } from "app/util/BigNumber";

export class TokenTransferReader {
    read(data: any, tokenInfo?: ITokenInfo) {
        let tokenTransfer: ITokenTransfer = {
            address: data["loggedBy"].replace(/^0x/, ""),
            name: tokenInfo ? tokenInfo.name : void 0,
            symbol: tokenInfo ? tokenInfo.symbol : void 0,
            from: String(data["transferFrom"]),
            to: String(data["transferTo"]),
            value: new BigNumber(data["transferValue"]),
            gasUsed: new BigNumber(data["gasUsed"]),
            gasPrice: new BigNumber(data["gasPrice"]),
            decimals: tokenInfo ? tokenInfo.decimals : 0
        };
        return tokenTransfer;
    }
}
