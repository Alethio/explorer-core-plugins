import { IModuleDef } from "plugin-api/IModuleDef";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { IIdenticonProps, Identicon } from "./Identicon";
import { IdenticonGeneratorFactory } from "./IdenticonGeneratorFactory";
import { IDataAdapter } from "plugin-api/IDataAdapter";
import { IdenticonProxy } from "./IdenticonProxy";
import { accountContextType } from "app/shared/context/accountContextType";

class IdenticonAdapter implements IDataAdapter<IAccountContext, IdenticonProxy> {
    private identiconGenerator = new IdenticonGeneratorFactory().create();

    contextType = accountContextType;

    async load(context: IAccountContext) {
        return this.identiconGenerator.get(context.accountHash);
    }
}

export const identiconModule: IModuleDef<IIdenticonProps, IAccountContext> = {
    contextType: accountContextType,

    dataAdapters: [{
        alias: "identicon",
        def: new IdenticonAdapter()
    }],

    getContentComponent: async () => Identicon,
    getContentProps(data) {
        let props: IIdenticonProps = {
            identicon: data.asyncData.get("identicon")!.data as IdenticonProxy
        };
        return props;
    },
    getHelpComponent: () => ({ translation }) => translation.get("accountView.sidebar.identicon.help") as any
};
