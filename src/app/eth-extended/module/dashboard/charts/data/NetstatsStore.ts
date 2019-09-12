import { LazyRecord } from "app/util/network/LazyRecord";

interface IRawData {
    "ethstats:nodeCountData": {
        active: string | number;
    };
}

export class NetstatsStore {
    constructor(private lazyRecord: LazyRecord<IRawData>) {

    }

    async getActiveNodesCount() {
        // TODO: integrate a data reader into lazy record
        let rawData = await this.lazyRecord.fetch();
        return Number(rawData["ethstats:nodeCountData"].active);
    }

    get onData() {
        return this.lazyRecord.onData;
    }

}
