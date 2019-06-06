// tslint:disable:no-string-literal
import { TokenTransferReader } from "app/eth-extended/data/token/transfer/TokenTransferReader";
import { TokenInfoReader } from "app/eth-extended/data/token/TokenInfoReader";
import { ITokenInfo } from "app/eth-extended/data/token/ITokenInfo";

export class TokenResponseReader {
    constructor(
        private tokenTransferReader: TokenTransferReader,
        private tokenInfoReader: TokenInfoReader
    ) {}

    read(data: any) {
        let tokenInfo = Object.keys(data["tokenInfo"]).reduce((map, address) => {
            map.set(address, this.tokenInfoReader.read(data["tokenInfo"][address]["tokenMeta"]));
            return map;
        }, new Map<string, ITokenInfo>());

        let tokenTransfers = (data["tokenTransfers"] as any[]).map(item => {
            let address = item["loggedBy"].replace(/^0x/, "");
            let tkTransf = this.tokenTransferReader.read(item, tokenInfo.get(address));
            return tkTransf;
        });

        return tokenTransfers;
    }
}
