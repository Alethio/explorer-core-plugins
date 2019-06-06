import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";

const TraceValueRoot = styled(ValueBox)`
    height: auto;
    padding-top: 10px;
    padding-bottom: 12px;
`;

const TraceValueInner = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

export const TraceValueBox: React.StatelessComponent = ({ children }) => (
    <TraceValueRoot>
        <TraceValueInner>
            {children}
        </TraceValueInner>
    </TraceValueRoot>
);
