export interface IAuthStore {
    /**
     * Must be a mobx @observable
     *
     * IMPORTANT: until this is set to true, plugin data source initialization will be blocked/paused indefinitely
     */
    isAuthenticated: boolean;
    applyLoginInfo(web3Eth: import("web3-eth").Eth): void;
}
