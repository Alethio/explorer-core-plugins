// tslint:disable:no-string-literal

export class LatestBlockNumberReader {
    read(data: any) {
        let blockNumber = Number(data["number"]);

        return blockNumber;
    }
}
