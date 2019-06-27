import * as React from "react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import styled, { css } from "@alethio/ui/lib/styled-components";

interface INetworkButtonRootProps {
    disabled?: boolean;
    onClick(): void;
}

const NetworkButtonRoot = styled<INetworkButtonRootProps, "div">("div")`
    cursor: ${props => props.disabled ? "default" : "pointer"};
    user-select: none;
    ${ props => props.disabled ? "" : css`
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.04);
    ` }
`;

const NetworkLabel = styled.div`
    font-weight: 400;
`;

const StyledValueBox = styled(ValueBox)`
    border-radius: 4px;
`;

export interface INetworkButtonProps {
    disabled?: boolean;
    onClick?(): void;
    onResize?(): void;
}

export class NetworkButton extends React.Component<INetworkButtonProps> {
    render() {
        let { disabled, children } = this.props;
        return (
            <NetworkButtonRoot onClick={this.handleClick} disabled={disabled}>
                <StyledValueBox
                    colors={(theme) => ({
                        background: disabled ? theme.colors.base.bg.main : theme.colors.base.bg.alt,
                        text: theme.colors.base.primary.color
                    })}
                    variant="big"
                >
                    <NetworkLabel>{ children }</NetworkLabel>
                </StyledValueBox>
            </NetworkButtonRoot>
        );
    }

    private handleClick = () => {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick();
        }
    }
}
