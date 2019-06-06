import { Eth } from "web3-eth";
import { IBlockTxCount } from "../../shared/data/block/value/IBlockTxCount";

export class Web3EthApi {
    private web3Eth: Eth;

    setWeb3Eth(web3Eth: Eth) {
        this.web3Eth = web3Eth;
    }

    async getBlock(blockNumber: number) {
        return (await this.web3Eth.getBlock(blockNumber, true)) || void 0;
    }

    async getBlockByHash(hash: string) {
        return (await this.web3Eth.getBlock(hash, true)) || void 0;
    }

    async getBlockRangeTransactionCount(rangeStart: number, rangeEnd: number) {
        let resultsPromises: Promise<IBlockTxCount | undefined>[] = [];
        for (let i = rangeStart; i < rangeEnd; i++) {
            resultsPromises.push(
                this.web3Eth.getBlockTransactionCount(i).then( result => {
                    if (!result) {
                        return void 0;
                    }
                    let blockValue: IBlockTxCount = {
                        id: i,
                        transactionCount: result
                    };
                    return blockValue;

                }).catch( e => {
                    return void 0;
                }
            ));
        }
        return await Promise.all(resultsPromises).then(results => results.filter(r => r !== void 0));
    }

    async getLatestBlock() {
        return this.web3Eth.getBlockNumber();
    }

    async getTransaction(txHash: string) {
        return (await this.web3Eth.getTransaction(txHash)) || void 0;
    }

    async getTransactionReceipt(txHash: string) {
        return (await this.web3Eth.getTransactionReceipt(txHash)) || void 0;
    }

    async getTxs(hashes: string[]) {
        return await Promise.all(
            hashes.map(hash => this.web3Eth.getTransaction(hash))
        );
    }

    async getTxsReceipts(hashes: string[]) {
        return await Promise.all(
            hashes.map(hash => this.web3Eth.getTransactionReceipt(hash))
        );
    }

    async getAddressBalance(address: string) {
        return (await this.web3Eth.getBalance(address)) || void 0;
    }

    async getAddressCode(address: string) {
        return (await this.web3Eth.getCode(address)) || void 0;
    }

    async getUncle(blockHashOrNumber: string | number, uncleIndex: number) {
        return (await this.web3Eth.getUncle(blockHashOrNumber, uncleIndex));
    }

    async getPeerCount() {
        return (await this.web3Eth.net.getPeerCount());
    }
}
