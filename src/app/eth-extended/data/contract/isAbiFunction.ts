import { AbiItemType } from "./IAbi";
import { IAbiMember } from "./IAbiMember";
import { IAbiFunction } from "./IAbiFunction";

export function isAbiFunction(abiMember: IAbiMember): abiMember is IAbiFunction {
    return abiMember.type === AbiItemType.Function;
}
