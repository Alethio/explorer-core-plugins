import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { IBlockTxsProps } from "./component/BlockTxs";
import { IBlockDetails } from "app/eth-memento/data/block/details/IBlockDetails";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { blockContextType } from "app/shared/context/blockContextType";

export const blockTxsModule: (ethSymbol: string) => IModuleDef<IBlockTxsProps, IBlockContext, void> = (ethSymbol) => ({
    contextType: blockContextType,

    dataAdapters: [
        {
            ref: AlethioAdapterType.BlockDetailsMemento
        }
    ],

    getContentComponent() {
        return import("./component/BlockTxs").then(({ BlockTxs }) => BlockTxs);
    },

    getContentProps(data) {
        let { asyncData, locale, translation, uiStateContainer } = data;

        let blockDetails = asyncData.get(AlethioAdapterType.BlockDetailsMemento)!.data as IBlockDetails;
        let latestEthPrice;

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
