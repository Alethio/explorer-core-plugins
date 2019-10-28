import { IDataAdapter } from "plugin-api/IDataAdapter";
import { IUncleDetails } from "app/eth-extended/data/uncle/IUncleDetails";
import { NotFoundError } from "app/shared/data/NotFoundError";
import { AlethioDataSource } from "../../AlethioDataSource";
import { IUncleByHashContext } from "../../context/IUncleByHashContext";
import { uncleByHashContextType } from "app/eth-extended/context/uncleByHashContextType";

export class UncleDetailsAdapter implements IDataAdapter<IUncleByHashContext, IUncleDetails> {
    contextType = uncleByHashContextType;

    constructor(private dataSource: AlethioDataSource) {

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
