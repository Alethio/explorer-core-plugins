import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { TxType } from "app/eth-extended/data/tx/TxType";
import { isFullTxDetails } from "app/eth-extended/data/tx/details/isFullTxDetails";
import { DecodedPayload } from "./DecodedPayload";
import { HexData } from "@alethio/ui/lib/data/hex/HexData";
import { ITranslation } from "plugin-api/ITranslation";
import { ITxDetails } from "app/eth-extended/data/tx/details/ITxDetails";

export interface ITxPayloadProps {
    txDetails: ITxDetails;
    translation: ITranslation;
}

export class TxPayload extends React.PureComponent<ITxPayloadProps> {
    render() {
        let { translation: tr, txDetails: tx } = this.props;

        let txPayload = tx ? tx.payload : void 0;
        let txDecodedPayload = tx && isFullTxDetails(tx) ? tx.decodedPayload : void 0;

        return <>
            { txPayload ?
                txDecodedPayload && tx.type === TxType.Call ?
                <DecodedPayload data={txDecodedPayload} tr={tr} />
                :
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <Label>{tr.get("txView.content.inputData.label")}</Label>
                        <HexData data={txPayload} />
                    </LayoutRowItem>
                </LayoutRow>
            : null }
        </>;
    }
}
