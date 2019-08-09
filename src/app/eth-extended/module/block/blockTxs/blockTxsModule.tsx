import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { IBlockTxsProps } from "./component/BlockTxs";
import { IBlockDetails } from "app/eth-extended/data/block/details/IBlockDetails";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

export const blockTxsModule: (ethSymbol: string) => IModuleDef<IBlockTxsProps, IBlockContext, void> = (ethSymbol) => ({
    contextType: blockContextType,

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockDetailsExtended
        },
        {
            ref: AlethioAdapterType.EthPrices,
            optional: true
        }
    ],

    getContentComponent() {
        return import("./component/BlockTxs").then(({ BlockTxs }) => BlockTxs);
    },

    getContentProps(data) {
        let { asyncData, locale, translation, uiStateContainer } = data;

        let blockDetails = asyncData.get(AlethioAdapterType.BlockDetailsExtended)!.data as IBlockDetails;
        let latestEthPrice = asyncData.get(AlethioAdapterType.EthPrices)!.data as number | undefined;

        let props: IBlockTxsProps = {
            txs: blockDetails.transactions,
            latestEthPrice,
            translation,
            locale,
            ethSymbol,
            uiStateContainer
        };
        return props;
    },

    getHelpComponent: () => ({ translation }) => <div dangerouslySetInnerHTML={{
        __html: translation.get("blockView.content.transactions.help")
    }} />
});
