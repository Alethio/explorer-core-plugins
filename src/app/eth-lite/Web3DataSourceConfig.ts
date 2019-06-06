export interface IConfigData {
    nodeUrl: string;
}

export class Web3DataSourceConfig {
    private data: IConfigData;

    fromJson(data: IConfigData) {
        this.data = data;
        return this;
    }

    getNodeUrl() {
        return this.data.nodeUrl;
    }
}
