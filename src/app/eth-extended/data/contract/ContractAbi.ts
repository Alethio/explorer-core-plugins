import { ContractAbiMethodReader } from "./ContractAbiMethodReader";
import { IAbiMember } from "app/eth-extended/data/contract/IAbiMember";
import { IAbiFunction } from "app/eth-extended/data/contract/IAbiFunction";
import { isAbiFunction } from "app/eth-extended/data/contract/isAbiFunction";
import { abiUtil } from "app/eth-extended/data/contract/abiUtil";
import { ILogger } from "plugin-api/ILogger";

export class ContractAbi {
    private _rawData: object[];

    private abiMembers: IAbiMember[];

    constructor(
        private contractAbiReader: ContractAbiMethodReader,
        private logger: ILogger
    ) {}

    setRawData(data: object[]) {
        this._rawData = data;
        this.abiMembers = (data as any[]).reduce((abiMembers: IAbiMember[], d: any) => {
            try {
                let m = this.contractAbiReader.read(d);
                abiMembers.push(m);
            } catch (e) {
                this.logger.warn("Abi method skipped due to reading errors", e);
            }
            return abiMembers;
        }, []);
    }

    getRawData() {
        return this._rawData;
    }

    getFunctions() {
        return this.abiMembers.reduce((abiFunctions: IAbiFunction[], method: IAbiMember) => {
            if (isAbiFunction(method)) {
                abiFunctions.push(method);
            }
            return abiFunctions;
        }, []);
    }

    getReadFunctions() {
        return this.getFunctions().filter((abiMember) =>
            abiUtil.method.isRead(abiMember)
        );
    }
}
