import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { IDecodedLogEvent, ILogEventInput } from "app/shared/data/logEvents/ILogEvent";
import {
    IdentationGuideLineIcon, IdentationLineWrapper
} from "app/shared/component/decodedPayload/IdentationLineWrapper";
import { PayloadDataLine } from "app/shared/component/decodedPayload/PayloadDataLine";

/*
TODO: Refactor. This entire file is duplicate of DecodedPayloadView.
Instead of two almost identical files we need a proper TreeView component.
*/
interface IDecodedLogEventViewProps {
    data: IDecodedLogEvent;
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

export class DecodedLogEventView extends React.PureComponent<IDecodedLogEventViewProps> {

    private getTxInputData(data: IDecodedLogEvent) {
        const lines: IDataLine[] = [];

        if (data.event) {
            lines.push({
                name: "event",
                value: data.event,
                identationIdx: 0,
                identationLinePath: []
            });
        }
        if (data.topic0) {
            lines.push({
                name: "topic0",
                value: data.topic0,
                identationIdx: 0,
                identationLinePath: []
            });
        }
        if (data.inputs) {
            lines.push({
                name: "inputs",
                identationIdx: 0,
                identationLinePath: []
            });
            this.getLogEventsLines(data.inputs, lines, 1, []);
        }
        return lines;
    }

    private getLogEventsLines(
        inputs: ILogEventInput[], lines: IDataLine[], identationIdx: number, identation: number[]
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
                this.getLogEventsLines(
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
