export interface IConfigData {
    /**
     * A node URL, which is passed to the web3 library. HTTP authentication is supported by prepending the URL with
     * user:pass@host...
     */
    nodeUrl: string;
    /** Customizable ETH symbol (e.g. GöETH) */
    ethSymbol?: string;
}

export class EthLitePluginConfig {
    private data: IConfigData;

    fromJson(data: IConfigData) {
        this.data = data;
        return this;
    }

    getNodeUrl() {
        return this.data.nodeUrl;
    }

    getEthSymbol() {
        return this.data.ethSymbol || "ETH";
    }
}
