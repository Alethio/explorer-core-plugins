import { observable } from "mobx";

export class PendingPoolStore {
    @observable
    private _eth: number | undefined;

    @observable
    private _erc: number | undefined;

    @observable
    private _size: number | undefined;

    setEth(value: number) {
        this._eth = value;
    }

    getEth() {
        return this._eth;
    }

    setErc(value: number) {
        this._erc = value;
    }

    getErc() {
        return this._erc;
    }

    setSize(value: number) {
        this._size = value;
    }

    getSize() {
        return this._size;
    }

}
