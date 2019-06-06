import { AbiItemType } from "./IAbi";
import { IAbiMember } from "./IAbiMember";
import { IAbiFallback } from "./IAbiFallback";

export function isAbiFallback(abiMember: IAbiMember): abiMember is IAbiFallback {
    return abiMember.type === AbiItemType.Fallback;
}
