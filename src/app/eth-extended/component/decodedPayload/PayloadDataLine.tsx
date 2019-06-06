import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { IDataLine } from "app/eth-extended/component/decodedPayload/DecodedPayloadView";

const PayloadDataLineRoot = styled.div`
    padding: 10px 0px;
    display: flex;
`;
const PayloadInputName = styled.div`
    color: ${props => props.theme.colors.payloadDataName};
    flex: 0 0 auto;
    padding-right: 8px;
`;
const PayloadInputType = styled.div`
    color: ${props => props.theme.colors.payloadDataType};
    flex: 0 0 auto;
    padding-right: 8px;
`;
const PayloadInputValue = styled.div`
    color: ${props => props.theme.colors.payloadDataValue};
    flex: 1 1 auto;
    word-Break: break-all;
`;

interface IPayloadDataLineProps {
    payload: IDataLine;
}

export class PayloadDataLine extends React.PureComponent<IPayloadDataLineProps> {
    render() {
        let l = this.props.payload;
        return (
            <PayloadDataLineRoot>
                <PayloadInputName>{ l.name }</PayloadInputName>
                { l.type ? <PayloadInputType>{ l.type } </PayloadInputType> : null }
                { l.value ? <PayloadInputValue>{ l.value }</PayloadInputValue> : null }
            </PayloadDataLineRoot>
        );
    }
}
