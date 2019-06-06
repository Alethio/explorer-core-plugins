import { AbiItemType, IAbiEventIO } from "./IAbi";

export interface IAbiEvent {
    type: AbiItemType.Event;
    name: string;
    inputs: IAbiEventIO[];
    anonymous: boolean;
}
