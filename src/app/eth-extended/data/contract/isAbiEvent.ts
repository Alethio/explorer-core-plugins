import { AbiItemType } from "./IAbi";
import { IAbiMember } from "./IAbiMember";
import { IAbiEvent } from "./IAbiEvent";

export function isAbiEvent(abiMember: IAbiMember): abiMember is IAbiEvent {
    return abiMember.type === AbiItemType.Event;
}
