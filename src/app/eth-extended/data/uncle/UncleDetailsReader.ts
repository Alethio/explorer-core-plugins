import { IUncleDetails } from "app/eth-extended/data/uncle/IUncleDetails";
import { BigNumber } from "app/util/BigNumber";

// tslint:disable:no-string-literal

export class UncleDetailsReader {
    read(data: any) {
        let uncleNumber = Number(data["number"]);
        let uncle: IUncleDetails = {
            id: uncleNumber,
            position: data["uncleIndex"] !== void 0 ? Number(data["uncleIndex"]) : void 0,
            creationTime: Number(data["blockCreationTime"]),
            hash: data["blockHash"],
            parentId: Number(data["includedInBlock"]),
            nonce: data["blockNonce"],
            sha3uncles: data["sha3Uncles"],
            beneficiaryAddress: data["hasBeneficiary"],
            beneficiaryName: data["hasBeneficiaryAlias"],
            beneficiaryReward: new BigNumber(data["uncleBeneficiaryReward"]),
            gasLimit: new BigNumber(data["blockGasLimit"]),
            difficulty: new BigNumber(data["blockDifficulty"]),
            extraData: String(data["blockExtraData"]),
            mixHash: String(data["blockMixHash"])
        };

        return uncle;
    }
}
