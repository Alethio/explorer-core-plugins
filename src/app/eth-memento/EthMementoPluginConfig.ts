interface IConfigData {
    /** Customizable ETH symbol (e.g. GöETH) */
    ethSymbol?: string;

    accountTxApiUrlMask: string;
}

export class EthMementoPluginConfig {
    private data: IConfigData;

    fromJson(data: IConfigData) {
        this.data = data;
        return this;
    }

    getEthSymbol() {
        return this.data.ethSymbol || "ETH";
    }

    /**
     * Url for account / tx api endpoint (replace %s with account hash)
     */
    getAccountTxApiUrlMask() {
        return this.data.accountTxApiUrlMask;
    }

}
