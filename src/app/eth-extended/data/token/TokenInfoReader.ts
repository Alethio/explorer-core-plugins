// tslint:disable:no-string-literal
import { ITokenInfo } from "./ITokenInfo";
import { BigNumber } from "app/util/BigNumber";

export class TokenInfoReader {
    read(data: any) {
        let tokenInfo: ITokenInfo = {
            name: data ? data["name"] : void 0,
            symbol: data ? data["symbol"] : void 0,
            decimals: data ? Number(data["decimals"] || 0) : 0,
            totalSupply: data && data["total_supply"] !== void 0 ? new BigNumber(data["total_supply"]) : void 0
        };
        return tokenInfo;
    }
}
