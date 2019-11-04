import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { IBlockDetails } from "app/eth-memento/data/block/details/IBlockDetails";
import { BlockDetailsSlotType } from "../BlockDetailsSlotType";
import { BlockBasic } from "app/eth-memento/module/block/blockBasic/BlockBasic";
import { BlockAdvanced } from "app/eth-memento/module/block/blockAdvanced/BlockAdvanced";
import { BlockLogsBloom } from "app/eth-memento/module/block/blockLogsBloom/BlockLogsBloom";

export interface IBlockDetailsProps {
    blockDetails: IBlockDetails;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    slots: Record<BlockDetailsSlotType, JSX.Element[]>;
}

export class BlockDetails extends React.PureComponent<IBlockDetailsProps> {
    render() {
        let { translation: tr, blockDetails: block, slots, locale, ethSymbol } = this.props;

        return <>
            <BlockBasic
                blockDetails={block}
                locale={locale}
                translation={tr}
                slots={{
                    confirmations: slots && slots[BlockDetailsSlotType.Confirmations]
                }}
            />
            { slots[BlockDetailsSlotType.Txs]}
            <BlockAdvanced
                blockDetails={block}
                locale={locale}
                translation={tr}
                ethSymbol={ethSymbol}
                slots={{
                    extraData: slots && slots[BlockDetailsSlotType.ExtraData]
                }}
            />
            <BlockLogsBloom
                blockDetails={block}
                locale={locale}
                translation={tr}
            />
        </>;
    }
}
