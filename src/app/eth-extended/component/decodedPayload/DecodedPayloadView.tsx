import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { IDecodedPayload, IDecodedInputPayload } from "app/eth-extended/data/payload/IDecodedPayload";
import { IdentationGuideLineIcon, IdentationLineWrapper } from "./IdentationLineWrapper";
import { PayloadDataLine } from "app/eth-extended/component/decodedPayload/PayloadDataLine";
import { ITranslation } from "plugin-api/ITranslation";

interface IDecodedPayloadViewProps {
    data: IDecodedPayload;
    translation: ITranslation;
}
export interface IDataLine {
    name: string;
    type?: string;
    value?: string;
    identationIdx: number;
    identationLinePath: IdentationGuideLineIcon[];
}
const DataRoot = styled.div`
    padding: 24px 40px;
`;
const DataLineWrapper = styled.div`
    font-family: "Roboto Mono", monospace;
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
`;

export class DecodedPayloadView extends React.PureComponent<IDecodedPayloadViewProps> {

    private getTxInputData(data: IDecodedPayload) {
        const lines: IDataLine[] = [];

        if (data.method) {
            lines.push({
                name: this.props.translation.get("txView.content.decodedPayload.method.label"),
                value: data.method,
                identationIdx: 0,
                identationLinePath: []
            });
        }
        lines.push({
            name: this.props.translation.get("txView.content.decodedPayload.methodId.label"),
            value: data.methodID,
            identationIdx: 0,
            identationLinePath: []
        });
        if (data.inputs) {
            lines.push({
                name: this.props.translation.get("txView.content.decodedPayload.inputs.label"),
                identationIdx: 0,
                identationLinePath: []
            });
            this.getPayloadLines(data.inputs, lines, 1, []);
        }
        if (data.outputs) {
            lines.push({
                name: this.props.translation.get("txView.content.decodedPayload.outputs.label"),
                identationIdx: 0,
                identationLinePath: []
            });
            this.getPayloadLines(data.outputs, lines, 1, []);
        }
        return lines;
    }

    private getPayloadLines(
        inputs: IDecodedInputPayload[], lines: IDataLine[], identationIdx: number, identation: number[]
    ) {
        inputs.forEach((arg, idx) => {
            if (arg.value) {
                lines.push({
                    name: arg.name ? arg.name : idx.toString(),
                    type: arg.type,
                    value: arg.value,
                    identationIdx,
                    identationLinePath: [
                        ...identation,
                        idx === inputs.length - 1 ? IdentationGuideLineIcon.LastLeaf : IdentationGuideLineIcon.Leaf
                    ]
                });
            } else if (arg.components) {
                lines.push({
                    name: arg.name ? arg.name : idx.toString(),
                    type: arg.type,
                    identationIdx,
                    identationLinePath: [
                        ...identation,
                        idx === inputs.length - 1 ? IdentationGuideLineIcon.LastLeaf : IdentationGuideLineIcon.Leaf
                    ]
                });
                let nextIdentation = [
                    ...identation,
                    idx === inputs.length - 1 ? IdentationGuideLineIcon.Empty : IdentationGuideLineIcon.Vertical
                ];
                this.getPayloadLines(
                    arg.components, lines, identationIdx + 1, nextIdentation
                );
            }
        });
    }

    render() {
        let data = this.getTxInputData(this.props.data);
        return (
            <DataRoot>
                { data.map((l, idx) =>
                    <DataLineWrapper key={idx}>
                        { [...l.identationLinePath].reverse().reduce((acc, identLine, idxLine) => {
                            return (
                                <IdentationLineWrapper key={`${idx}_${idxLine}`} icon={identLine}>
                                    { acc }
                                </IdentationLineWrapper>
                            );
                        }, <PayloadDataLine payload={l} />) }
                    </DataLineWrapper>
                )}
            </DataRoot>
        );
    }
}
