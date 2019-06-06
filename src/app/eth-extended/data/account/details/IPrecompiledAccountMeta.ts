import { BigNumber } from "app/util/BigNumber";
export interface IPrecompiledAccountMeta {
    // Brand
    precompiled: true;
    protocol?: undefined;
    /** Block number */
    precompiledActivatedAt?: number;
    precompiledGasWordCost?: BigNumber;
    precompiledGasDivisor?: BigNumber;
    precompiledGasPoint?: BigNumber;
    precompiledGasBaseCost?: BigNumber;
}
