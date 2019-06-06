import { AbiItemType } from "./IAbi";

export interface IAbiFallback {
    type: AbiItemType.Fallback;
    name?: string;
    constant?: boolean;
    payable: boolean;
}
