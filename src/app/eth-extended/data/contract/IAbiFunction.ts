import { AbiItemType, AbiFunctionStateMutability, IAbiMemberIO } from "./IAbi";

export interface IAbiFunction {
    type: AbiItemType.Function;
    name: string;
    /**
     * true if function is specified to not modify the blockchain state
     */
    constant?: boolean;
    /**
     * true if function accepts ether, defaults to false
     */
    payable: boolean;
    stateMutability: AbiFunctionStateMutability;
    inputs: IAbiMemberIO[];
    outputs: IAbiMemberIO[];
}
