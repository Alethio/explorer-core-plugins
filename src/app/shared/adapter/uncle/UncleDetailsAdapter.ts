import { IDataAdapter } from "plugin-api/IDataAdapter";
import { IUncleDetails } from "app/shared/data/uncle/IUncleDetails";
import { NotFoundError } from "app/shared/data/NotFoundError";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IUncleByHashContext } from "app/eth-extended/context/IUncleByHashContext";
import { uncleByHashContextType } from "app/shared/context/uncleByHashContextType";
import { MementoDataSource } from "app/eth-memento/MementoDataSource";

export class UncleDetailsAdapter implements IDataAdapter<IUncleByHashContext, IUncleDetails> {
    contextType = uncleByHashContextType;

    constructor(private dataSource: AlethioDataSource | MementoDataSource) {

    }

    async load(context: IUncleByHashContext) {
        try {
            return await this.dataSource.stores.uncleDetailsStore.fetch(context.uncleHash);
        } catch (e) {
            if (e instanceof NotFoundError) {
                return void 0;
            }
            throw e;
        }
    }
}
