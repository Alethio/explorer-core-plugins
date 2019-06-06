import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";

const Divider = styled.div`
    height: 1px;
    margin-top: 28px;
    margin-bottom: 32px;
    background-color: ${({ theme }) => theme.colors.gridBorder};
`;

export interface IChartsProps {
    modules: JSX.Element[] | undefined;
}

export class Charts extends React.Component<IChartsProps> {
    render() {
        return (
            this.props.modules ? this.props.modules.map((mod, i) => i && mod ?
                <React.Fragment key={i}><Divider />{mod}</React.Fragment> :
                mod
            ) : null
        );
    }
}
