import { AbiItemType, AbiFunctionStateMutability, IAbiMemberIO } from "./IAbi";

export interface IAbiConstructor {
    type: AbiItemType.Constructor;
    constant?: boolean;
    payable: boolean;
    stateMutability: AbiFunctionStateMutability;
    inputs: IAbiMemberIO[];
}
