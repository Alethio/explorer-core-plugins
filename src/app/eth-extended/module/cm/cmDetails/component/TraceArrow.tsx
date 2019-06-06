import * as React from "react";
import { ArrowForwardIcon } from "@alethio/ui/lib/icon/ArrowForwardIcon";
import styled from "@alethio/explorer-ui/lib/styled-components";

const TraceArrowRoot = styled.div`
    margin-top: 2px;
    color: ${props => props.theme.colors.valueBox.secondary.text};
`;

export interface ITraceArrowProps {

}

export class TraceArrow extends React.Component<ITraceArrowProps> {
    render() {
        return (
            <TraceArrowRoot>
                <ArrowForwardIcon size={12} />
            </TraceArrowRoot>
        );
    }
}
