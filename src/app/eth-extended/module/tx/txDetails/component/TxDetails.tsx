import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxDetails } from "app/shared/data/tx/details/ITxDetails";
import { TxBasic } from "app/shared/module/tx/txBasic/TxBasic";
import { TxAdvanced } from "app/shared/module/tx/txAdvanced/TxAdvanced";

export interface ITxDetailsProps {
    txHash: string;
    txDetails: ITxDetails;
    latestEthPrice: number | undefined;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    blockConfirmationsSlot?: JSX.Element[];
}

export class TxDetails extends React.PureComponent<ITxDetailsProps> {
    render() {
        let { translation: tr, txDetails: tx, locale, latestEthPrice, blockConfirmationsSlot, ethSymbol } = this.props;

        return <>
            <TxBasic
                txDetails={tx}
                txHash={this.props.txHash}
                locale={locale}
                translation={tr}
                latestEthPrice={latestEthPrice}
                ethSymbol={ethSymbol}
                blockConfirmationsSlot={blockConfirmationsSlot}
            />
            <TxAdvanced
                txDetails={tx}
                txHash={this.props.txHash}
                locale={locale}
                translation={tr}
                latestEthPrice={latestEthPrice}
                ethSymbol={ethSymbol}
            />
        </>;
    }
}
