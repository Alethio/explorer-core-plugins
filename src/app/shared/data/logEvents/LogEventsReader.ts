// tslint:disable:no-string-literal
import { ILogEvent, IDecodedLogEvent, ILogEventInput } from "./ILogEvent";

export class LogEventsReader {
    read(data: any) {
        let eventDecoded: IDecodedLogEvent | undefined = data["eventDecoded"] ? {
            event: String(data["eventDecoded"]["event"]),
            topic0: String(data["eventDecoded"]["topic0"]),
            inputs: data["eventDecoded"]["inputs"] ?
                this.argumentDecoder(data["eventDecoded"]["inputs"] as any[]) :
                void 0
        } : void 0;
        let logEvents: ILogEvent = {
            hasLogTopics: (data["hasLogTopics"] as string[]),
            logData: String(data["logData"]),
            eventDecodedError: String(data["eventDecodedError"]),
            eventDecoded
        };
        return logEvents;
    }

    /*
    TODO: Refactor. This is duplicate of Decoder.argumentDecoder.
     */
    private argumentDecoder(inputs: any[]) {
        return (inputs as any[]).map((arg) => {
            let decodedArg: ILogEventInput = {
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
