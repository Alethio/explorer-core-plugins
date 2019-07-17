import { IDeepstreamConfig } from "app/util/network/Deepstream";

export interface IConfigData {
    ACCOUNT_API_URL_MASK: string;
    ACCOUNT_TX_API_URL_MASK: string;
    ACCOUNT_CM_API_URL_MASK: string;
    ACCOUNT_CONTRACT_API_URL_MASK: string;

    BALANCE_LATEST_API_URL: string;
    BALANCE_HISTORICAL_API_URL: string;

    BLOCK_API_URL_MASK: string;
    BLOCK_VALUE_API_URL_MASK: string;

    CM_API_URL_MASK: string;
    CM_CM_API_URL_MASK: string;
    CM_TOKENS_API_URL_MASK: string;
    CM_LOG_EVENTS_API_URL_MASK: string;

    DS_URL: string;
    DS_USER: string;
    DS_PASS: string;

    INFURA_API_URL: string;

    /** URL to the USD prices API endpoint (optional). Omit it to disable USD prices functionality. */
    PRICES_API_URL?: string;

    SEARCH_API_URL_MASK: string;

    TX_API_URL_MASK: string;
    TX_GRAPHS_API_URL_MASK: string;
    TX_TOKENS_API_URL_MASK: string;
    TX_LOG_EVENTS_API_URL_MASK: string;
    TX_CM_API_URL_MASK: string;

    UNCLE_API_URL_MASK: string;
}

export class AlethioDataSourceConfig {
    private data: IConfigData;

    fromJson(data: IConfigData) {
        this.data = data;
        return this;
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

    /**
     * URL for tx api endpoint (replace %s with tx hash)
     */
    getTxApiUrlMask() {
        return this.data.TX_API_URL_MASK;
    }

    /**
     * URL for tx tokens api endpoint (replace %s with tx hash)
     */
    getTxTokensApiUrlMask() {
        return this.data.TX_TOKENS_API_URL_MASK;
    }

    /**
     * URL for tx event logs api endpoint (replace %s with tx hash)
     */
    getTxLogEventsApiUrlMask() {
        return this.data.TX_LOG_EVENTS_API_URL_MASK;
    }

    /**
     * URL for tx graphs api endpoint (replace %s with tx hash)
     */
    getTxGraphsApiUrlMask() {
        return this.data.TX_GRAPHS_API_URL_MASK;
    }

    /**
     * Url for tx/contract messages api endpoint (replace %s with tx hash)
     */
    getTxContractMsgsApiUrlMask() {
        return this.data.TX_CM_API_URL_MASK;
    }

    /**
     * Url for contract messages details API
     */
    getContractMsgApiUrlMask() {
        return this.data.CM_API_URL_MASK;
    }

    /**
     * Url for contract messages in contract message
     */
    getContractMsgContractMsgsApiUrlMask() {
        return this.data.CM_CM_API_URL_MASK;
    }

    getCmTokensApiUrlMask() {
        return this.data.CM_TOKENS_API_URL_MASK;
    }

    getCmLogEventsApiUrlMask() {
        return this.data.CM_LOG_EVENTS_API_URL_MASK;
    }

    /**
     * Url for account details api endpoint (replace %s with account hash)
     */
    getAccountApiUrlMask() {
        return this.data.ACCOUNT_API_URL_MASK;
    }

    /**
     * Url for account / tx api endpoint (replace %s with account hash)
     */
    getAccountTxApiUrlMask() {
        return this.data.ACCOUNT_TX_API_URL_MASK;
    }

    /**
     * Url for account / tx api endpoint (replace %s with account hash)
     */
    getAccountCmApiUrlMask() {
        return this.data.ACCOUNT_CM_API_URL_MASK;
    }

    /**
     * Url for contract account details
     * (replace %d with contract_id, %s with resource name - contract-code, contract-abi, contract-source-code)
     */
    getAccountContractApiUrlMask() {
        return this.data.ACCOUNT_CONTRACT_API_URL_MASK;
    }

    getDeepstreamConfig() {
        let config: IDeepstreamConfig = {
            url: this.data.DS_URL,
            user: this.data.DS_USER,
            pass: this.data.DS_PASS
        };

        return config;
    }

    getPricesApiUrl() {
        return this.data.PRICES_API_URL;
    }

    getBalanceLatestApiUrl() {
        return this.data.BALANCE_LATEST_API_URL;
    }

    getBalanceHistoricalApiUrl() {
        return this.data.BALANCE_HISTORICAL_API_URL;
    }

    /**
     * URL for uncle api endpoint (replace %s with uncleHash)
     */
    getUncleApiUrlMask() {
        return this.data.UNCLE_API_URL_MASK;
    }

    /**
     * URL for search API (replace %s with query string)
     */
    getSearchApiUrlMask() {
        return this.data.SEARCH_API_URL_MASK;

    }

    getInfuraApiUrl() {
        return this.data.INFURA_API_URL;
    }
}
