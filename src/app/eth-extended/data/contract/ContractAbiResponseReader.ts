import { IAbiMemberIOValue } from "./IAbi";
import { IAbiFunction } from "app/eth-extended/data/contract/IAbiFunction";

export class ContractAbiResponseReader {
    read(response: any, abiFn: IAbiFunction) {
        let results: IAbiMemberIOValue[];
        if (abiFn.outputs.length === 1) {
            results = [{
                name: abiFn.outputs[0].name,
                type: abiFn.outputs[0].type,
                value: String(response)
            }];
            return results;
        }

        results = abiFn.outputs.map((output) => {
            return {
                name: output.name,
                type: output.type,
                value: String(response[output.name])
            };
        });
        return results;
    }
}
