// tslint:disable:no-string-literal
import { IProtocolAccountMeta } from "app/eth-extended/data/account/details/IProtocolAccountMeta";
import { IPrecompiledAccountMeta } from "app/eth-extended/data/account/details/IPrecompiledAccountMeta";
import { BigNumber } from "app/util/BigNumber";

export function readAccountMeta(data: any) {
    let meta: IPrecompiledAccountMeta | IProtocolAccountMeta | undefined;

    if (data && data["precompiled"]) {
        meta = {
            precompiled: true,
            precompiledActivatedAt: Number(data["precompiledActivatedAt"]),
            precompiledGasBaseCost: readBigNumber(data["precompiledGasBaseCost"]),
            precompiledGasDivisor: readBigNumber(data["precompiledGasDivisor"]),
            precompiledGasPoint: readBigNumber(data["precompiledGasPoint"]),
            precompiledGasWordCost: readBigNumber(data["precompiledGasWordCost"])
        };
    } else if (data && data["protocol"]) {
        meta = {
            accountBalancePrefunded: readBigNumber(data["accountBalancePrefunded"]),
            protocol: true
        };
    }

    return meta;
}

function readBigNumber(data: any) {
    return data !== void 0 ? new BigNumber(data) : void 0;
}
