import { AbiItemType } from "./IAbi";
import { IAbiMember } from "./IAbiMember";
import { IAbiConstructor } from "./IAbiConstructor";

export function isAbiConstructor(abiMember: IAbiMember): abiMember is IAbiConstructor {
    return abiMember.type === AbiItemType.Constructor;
}
