import { IDataAdapter } from "plugin-api/IDataAdapter";
import { blockContextType } from "app/shared/context/blockContextType";

export interface IEthPriceContext {
    blockNumber: number;
}

export class NullEthPriceAdapter implements IDataAdapter<IEthPriceContext, number> {
    contextType = blockContextType;

    async load(context: IEthPriceContext) {
        return void 0;
    }
}
