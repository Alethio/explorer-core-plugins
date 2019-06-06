import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { ITranslation } from "plugin-api/ITranslation";
import { TypedValueBox } from "@alethio/ui/lib/layout/content/box/TypedValueBox";
import { ILogEvent } from "app/eth-extended/data/logEvents/ILogEvent";
import { DecodedLogEventView } from "app/eth-extended/module/tx/txSummary/component/DecodedLogEventView";

interface ILogEventsProps {
    translation: ITranslation;
    data: ILogEvent[];
}

const LogEventsRoot = styled.div``;
const LogEventsSection = styled.div`
    border-bottom: 1px solid ${({theme}) => theme.colors.logEventsBorder };
`;
const RawLogEventsSection = styled.div`
    padding: 20px 0;
`;

const EVENT_LOGS_LINE_BASE_HEIGHT = 44;

export class LogEvents extends React.Component<ILogEventsProps> {
    render() {
        const { translation: tr, data } = this.props;
        return (
            <LogEventsRoot>
                { data.map((eLog, eLogId) =>
                    <LogEventsSection key={eLogId}>
                        { eLog.eventDecoded ? this.renderDecodedEvent(eLog) : this.renderRawEvent(eLog, tr) }
                    </LogEventsSection>
                ) }
            </LogEventsRoot>
        );
    }

    renderDecodedEvent(eLog: ILogEvent) {
        return <DecodedLogEventView data={eLog.eventDecoded!} />;
    }

    renderRawEvent(eLog: ILogEvent, tr: ITranslation) {
        return <RawLogEventsSection>
                { eLog.hasLogTopics.map((topic, idx) =>
                    <LayoutRow key={idx}>
                        <LayoutRowItem baseHeight={EVENT_LOGS_LINE_BASE_HEIGHT} >
                            <Label>
                                {tr.get("txView.content.txSummary.logEvents.topic.value") + " " + idx}
                            </Label>
                            <TypedValueBox value={topic} />
                        </LayoutRowItem>
                    </LayoutRow>
                ) }
                <LayoutRow>
                    <LayoutRowItem baseHeight={EVENT_LOGS_LINE_BASE_HEIGHT} >
                        <Label>
                            {tr.get("txView.content.txSummary.logEvents.logData.value")}
                        </Label>
                        <TypedValueBox value={eLog.logData} />
                    </LayoutRowItem>
                </LayoutRow>
            </RawLogEventsSection>;
    }
}
