import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IDataAdapter } from "plugin-api/IDataAdapter";
import { NotFoundError } from "app/shared/data/NotFoundError";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";
import { ICmContext } from "../../context/ICmContext";
import { cmContextType } from "app/shared/context/cmContextType";

export class CmDetailsAdapter implements IDataAdapter<ICmContext, ICmDetails> {
    contextType = cmContextType;

    constructor(private dataSource: AlethioDataSource) {

    }

    async load(context: ICmContext) {
        try {
            return await this.dataSource.stores.cmDetailsStore.fetch(context.txHash, context.validationIndex);
        } catch (e) {
            if (e instanceof NotFoundError) {
                return void 0;
            }
            throw e;
        }
    }
}
