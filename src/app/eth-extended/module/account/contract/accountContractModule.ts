import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioDataSource } from "app/eth-extended/AlethioDataSource";
import { IContractProps } from "./component/Contract";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { IAccountDetails } from "app/eth-extended/data/account/details/IAccountDetails";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { ContractModuleSlotType } from "./ContractModuleSlotType";
import { accountContextType } from "app/shared/context/accountContextType";

export const accountContractModule:
(dataSource: AlethioDataSource) => IModuleDef<IContractProps, IAccountContext, ContractModuleSlotType> =
(dataSource) => ({
    contextType: accountContextType,
    slotNames: Object.values(ContractModuleSlotType),

    dataAdapters: [{
        ref: AlethioAdapterType.AccountDetailsExtended
    }],

    getContentComponent: async () => import("./component/Contract").then(({ Contract }) => Contract),
    getContentProps(data) {
        let { translation, logger, locale, asyncData, context, slots } = data;

        let { contractDetailsStore } = dataSource.stores;
        let accountDetails = asyncData.get(AlethioAdapterType.AccountDetailsExtended)!.data as IAccountDetails;

        let props: IContractProps = {
            accountDetails,
            accountHash: context.accountHash,
            contractDetailsStore,
            contractWeb3Api: dataSource.contractWeb3Api,
            locale,
            logger,
            translation,
            accordionExtraItems: slots && slots[ContractModuleSlotType.AccordionItems]
        };
        return props;
    }
});
