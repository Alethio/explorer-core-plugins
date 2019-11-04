interface IConfigData {
    /** Customizable ETH symbol (e.g. GöETH) */
    ethSymbol?: string;

    accountTxApiUrlMask: string;

    BLOCK_API_URL_MASK: string;
    BLOCK_VALUE_API_URL_MASK: string;
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

    /**
     * URL for block api endpoint (replace %d with blockId)
     */
    getBlockApiUrlMask() {
        return this.data.BLOCK_API_URL_MASK;
    }

    /**
     * URL for block value api endpoint (replace %d, %d with range start,end)
     */
    getBlockValueApiUrlMask() {
        return this.data.BLOCK_VALUE_API_URL_MASK;
    }

}
