import * as React from "react";
import { ThemeContext } from "plugin-api/ThemeContext";
import { Bubble } from "@alethio/ui/lib/data/vis/Bubble";
import { Link } from "plugin-api/component/Link";
import { Tooltip } from "@alethio/ui/lib/overlay/tooltip/Tooltip";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

interface ITxItemProps {
    size: number;
    wrapperSize: number;
    txHash: string;
    active: boolean;
}

export const TxItem: React.StatelessComponent<ITxItemProps> = ({ txHash, size, active }) => {
    return (
        <Tooltip
            placement="right"
            offset={10}
            nonInteractive
            showDelay={0}
            hideDelay={0}
            content={
                <div style={{padding: 8}}>
                    <TxHashBox noLink noTooltip variant="small">{txHash}</TxHashBox>
                </div>
            }
        >
            <Link to={`page://aleth.io/tx?txHash=${txHash}`}>
                <ThemeContext.Consumer>
                    {(theme: ITheme) =>
                        <Bubble
                            size={size}
                            wrapperSize={theme.spacing.bubbleWrapperSize}
                            backgroundColor={active ? theme.colors.txSidebarItemActive : theme.colors.txSidebarItem}
                            borderColor={theme.colors.txSidebarItemActive}
                        />
                    }
                </ThemeContext.Consumer>
            </Link>
        </Tooltip>
    );
};
