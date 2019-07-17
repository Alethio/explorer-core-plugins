import { EthExtendedPluginConfig } from "app/eth-extended/EthExtendedPluginConfig";

export class Web3Factory {
    private Web3: typeof import("web3").default;

    constructor(
        private appConfig: EthExtendedPluginConfig
    ) {}

    async create() {
        if (!this.Web3) {
            this.Web3 = (await import("web3")).default;
        }

        return new this.Web3(this.appConfig.getInfuraApiUrl());
    }

}
