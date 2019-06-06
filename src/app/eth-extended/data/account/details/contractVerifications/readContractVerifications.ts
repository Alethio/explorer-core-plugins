// tslint:disable:no-string-literal
import { IContractVerifications } from "./IContractVerifications";

export function readContractVerifications(data: any) {
    let verif: IContractVerifications;

    verif = {
        mythX: data["mythX"] ? Boolean(data["mythX"]) : false
    };

    return verif;
}
