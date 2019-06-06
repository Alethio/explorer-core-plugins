// tslint:disable:no-string-literal
import {
    AbiItemType, AbiFunctionStateMutability, IAbiMemberIO, IAbiEventIO
} from "app/eth-extended/data/contract/IAbi";
import { IAbiFunction } from "app/eth-extended/data/contract/IAbiFunction";
import { IAbiEvent } from "app/eth-extended/data/contract/IAbiEvent";
import { IAbiConstructor } from "app/eth-extended/data/contract/IAbiConstructor";
import { IAbiFallback } from "app/eth-extended/data/contract/IAbiFallback";

export class ContractAbiMethodReader {
    read(data: any) {
        let type = data["type"] || AbiItemType.Function;
        switch (type) {
            case AbiItemType.Function:
                let abiFunction: IAbiFunction = {
                    type: AbiItemType.Function,
                    name: String(data["name"]),
                    constant: (data["constant"] === true || data["constant"] === false) ? data["constant"] : void 0,
                    payable: data["payable"] ? true : false,
                    stateMutability: data["stateMutability"] as AbiFunctionStateMutability,
                    inputs: (data["inputs"] as any[]).map(input => {
                        let abiMemberIO: IAbiMemberIO = {
                            name: input["name"],
                            type: input["type"]
                        };
                        return abiMemberIO;
                    }),
                    outputs: (data["outputs"] as any[]).map(output => {
                        let abiMemberIO: IAbiMemberIO = {
                            name: output["name"],
                            type: output["type"]
                        };
                        return abiMemberIO;
                    })
                };
                return abiFunction;
            case AbiItemType.Event:
                let abiEvent: IAbiEvent = {
                    type: AbiItemType.Event,
                    name: String(data["name"]),
                    inputs: (data["inputs"] as any[]).map(input => {
                        let abiMemberIO: IAbiEventIO = {
                            name: input["name"],
                            type: input["type"],
                            indexed: input["indexed"] ? true : false
                        };
                        return abiMemberIO;
                    }),
                    anonymous: data["anonymous"] ? true : false
                };
                return abiEvent;
            case AbiItemType.Constructor:
                let abiConstructor: IAbiConstructor = {
                    type: AbiItemType.Constructor,
                    constant: (data["constant"] === true || data["constant"] === false) ? data["constant"] : void 0,
                    payable: data["payable"] ? true : false,
                    stateMutability: data["stateMutability"] as AbiFunctionStateMutability,
                    inputs: (data["inputs"] as any[]).map(input => {
                        let abiMemberIO: IAbiMemberIO = {
                            name: input["name"],
                            type: input["type"]
                        };
                        return abiMemberIO;
                    })
                };
                return abiConstructor;
            case AbiItemType.Fallback:
                let abiFallback: IAbiFallback = {
                    type: AbiItemType.Fallback,
                    name: String(data["name"]) || void 0,
                    constant: (data["constant"] === true || data["constant"] === false) ? data["constant"] : void 0,
                    payable: data["payable"] ? true : false
                };
                return abiFallback;
            default:
                throw new Error("Unknown abi item type " + type);
        }
    }
}
