/**
 * "function", "constructor"
 * (can be omitted, defaulting to "function"; "fallback" also possible but not relevant in web3.js);
 */
export enum AbiItemType {
    Function = "function",
    Constructor = "constructor",
    Fallback = "fallback",
    Event = "event"
}

/**
 * a string with one of the following values:
 *      pure (specified to not read blockchain state),
 *      view (same as constant above),
 *      nonpayable and payable (same as payable above)
 */
export enum AbiFunctionStateMutability {
    Pure = "pure",
    View = "view",
    Payable = "payable",
    NonPayable = "nonpayable"
}

export interface IAbiMemberIO {
    name: string;
    type: string;
}

export interface IAbiEventIO extends IAbiMemberIO {
    indexed: boolean;
}

export interface IAbiMemberIOValue extends IAbiMemberIO {
    value: string;
}
