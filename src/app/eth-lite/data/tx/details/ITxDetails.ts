import { BigNumber } from "app/util/BigNumber";

export interface ITxDetails {
    hash: string;
    from: string;
    to: string;
    value: BigNumber;
    nonce: number;
    gasLimit: BigNumber;
    gasPrice: BigNumber;
    payload: string | undefined;
    block: {
        id: number;
    };
    txIndex: number;
}
