// tslint:disable:no-string-literal
import { IDecodedPayload, IDecodedInputPayload } from "./IDecodedPayload";
import { ILogger } from "plugin-api/ILogger";

export class Decoder {
    constructor(private logger: ILogger) {

    }

    decode(payload: string | undefined, rules: IDecodedPayload | undefined) {
        if (!payload || !rules) {
            return void 0;
        }
        try {
            const decodedPayload: IDecodedPayload = {
                method: rules["method"],
                methodID: rules["methodID"],
                inputs: rules["inputs"] ? this.argumentDecoder(rules["inputs"] as any[]) : void 0,
                outputs: rules["outputs"] ? this.argumentDecoder(rules["outputs"] as any[]) : void 0
            };
            return decodedPayload;
        } catch (e) {
            this.logger.error("Payload decode failed", e);
            return void 0;
        }
    }

    private argumentDecoder(inputs: any[]) {
        return (inputs as any[]).map((arg) => {
            let decodedArg: IDecodedInputPayload = {
                name: arg["name"],
                type: arg["type"]
            };
            if (arg["value"] !== void 0) {
                decodedArg.value = String(arg["value"]);
            }
            if (arg["components"]) {
                decodedArg.components = this.argumentDecoder(arg["components"] as any[]);
            }
            return decodedArg;
        });
    }
}
