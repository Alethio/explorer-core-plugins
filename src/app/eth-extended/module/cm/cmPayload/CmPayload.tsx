import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { CmType } from "app/eth-extended/data/contractMsg/CmType";
import { DecodedPayload } from "app/eth-extended/module/tx/txPayload/component/DecodedPayload";
import { HexData } from "@alethio/ui/lib/data/hex/HexData";
import { ICmDetails } from "app/eth-extended/data/contractMsg/details/ICmDetails";
import { ITranslation } from "plugin-api/ITranslation";

export interface ICmPayloadProps {
    txHash: string;
    txValidationIndex: number;
    cmDetails: ICmDetails;
    translation: ITranslation;
}

export class CmPayload extends React.PureComponent<ICmPayloadProps> {
    render() {
        let { translation: tr, cmDetails: cm } = this.props;

        return <>
            { cm.payload ?
                cm.decodedPayload && cm.type === CmType.Call ?
                <DecodedPayload data={cm.decodedPayload} tr={tr} />
                :
                <LayoutRow>
                    <LayoutRowItem fullRow autoHeight>
                        <Label>{tr.get("txView.content.inputData.label")}</Label>
                        <HexData data={cm.payload} />
                    </LayoutRowItem>
                </LayoutRow>
            : null }
        </>;
    }
}
