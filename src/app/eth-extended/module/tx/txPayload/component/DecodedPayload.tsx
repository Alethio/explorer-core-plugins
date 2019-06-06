import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { IDecodedPayload } from "app/eth-extended/data/payload/IDecodedPayload";
import { DecodedPayloadView } from "app/eth-extended/component/decodedPayload/DecodedPayloadView";
import { ITranslation } from "plugin-api/ITranslation";

interface IDecodedPayloadProps {
    data: IDecodedPayload;
    tr: ITranslation;
}

const DecodedPayloadWrapper = styled.div`
    width: 100%;
    background-color: ${({theme}) => theme.colors.payloadBoxBg};
    border-top: 1px solid ${({theme}) => theme.colors.payloadBoxBorder};
    border-bottom: 1px solid ${({theme}) => theme.colors.payloadBoxBorder};
`;
const DecodedPayloadLabel = styled.div`
    color: ${({theme}) => theme.colors.valueBox.primary.text};
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.2px;
    line-height: 24px;
    padding: 12px 16px;
    border-bottom: 1px solid ${({theme}) => theme.colors.payloadBoxBorder};
`;

export class DecodedPayload extends React.Component<IDecodedPayloadProps> {
    render() {
        return (
            <DecodedPayloadWrapper>
                <DecodedPayloadLabel>
                    {this.props.tr.get("txView.content.inputData.label")}
                </DecodedPayloadLabel>
                <DecodedPayloadView data={this.props.data} translation={this.props.tr} />
            </DecodedPayloadWrapper>
        );
    }
}
