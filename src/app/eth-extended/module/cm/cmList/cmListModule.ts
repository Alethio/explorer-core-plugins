import { IModuleDef } from "plugin-api/IModuleDef";
import { ICmParentContext } from "../../../context/ICmParentContext";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { AlethioDataSource } from "../../../AlethioDataSource";
import { ICmSidebarProps, CmSidebar } from "./component/CmSidebar";
import { cmParentContextType } from "app/eth-extended/context/cmParentContextType";

export const cmListModule: (dataSource: AlethioDataSource) => IModuleDef<ICmSidebarProps, ICmParentContext> =
(dataSource) => ({
    contextType: cmParentContextType,

    dataAdapters: [{
        alias: "cmList",
        def: {
            contextType: cmParentContextType,
            load: context => {
                if (context.parentValidationIndex) {
                    return dataSource.stores.cmLiteStore.fetchByCm(context.txHash, context.parentValidationIndex);
                } else {
                    return dataSource.stores.cmLiteStore.fetchByTx(context.txHash)
                        .then(allDescendents => allDescendents.filter(c => c.depth === 1));
                }
            }
        },
        optional: true
    }],

    getContentComponent: async () => CmSidebar,

    getContentProps(data) {
        let { context, asyncData, translation, sidebarVisible } = data;

        let contractMsgs = asyncData.get("cmList")!.data as ICmLite[] | undefined;

        let props: ICmSidebarProps = {
            txHash: context.txHash,
            txValidationIndex: context.validationIndex,
            contractMsgs,
            translation,
            mobileVisible: sidebarVisible
        };
        return props;
    }
});
