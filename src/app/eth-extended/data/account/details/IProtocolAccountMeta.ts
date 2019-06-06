import { BigNumber } from "app/util/BigNumber";
export interface IProtocolAccountMeta {
    // Brand
    precompiled?: undefined;
    protocol: true;
    accountBalancePrefunded?: BigNumber;
}
