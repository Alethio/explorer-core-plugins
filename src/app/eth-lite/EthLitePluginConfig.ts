export interface IConfigData {
    /**
     * A node URL, which is passed to the web3 library. HTTP authentication is supported by prepending the URL with
     * user:pass@host...
     */
    nodeUrl: string;
    /**
     * An URI pointing to a data adapter that returns an AuthStore instance
     *
     * This is used to allow custom RPC node authentication methods to be defined by 3rd party plugins
     *
     * See the IAuthStore interface definition
     */
    authStoreUri?: string;
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

    getAuthStoreUri() {
        return this.data.authStoreUri;
    }
}
