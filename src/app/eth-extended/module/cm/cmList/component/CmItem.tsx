import * as React from "react";
import { ThemeContext } from "plugin-api/ThemeContext";
import { Bubble } from "@alethio/ui/lib/data/vis/Bubble";
import { Link } from "plugin-api/component/Link";
import { Tooltip } from "@alethio/ui/lib/overlay/tooltip/Tooltip";
import { CmIdBox } from "app/eth-extended/component/box/cm/CmIdBox";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

interface ICmItemProps {
    size: number;
    wrapperSize: number;
    txHash: string;
    txValidationIndex: number;
    active: boolean;
}

export const CmItem: React.StatelessComponent<ICmItemProps> = ({ txHash, txValidationIndex, size, active }) => {
    return (
        <Tooltip
            placement="right"
            offset={10}
            nonInteractive
            showDelay={0}
            hideDelay={0}
            content={
                <div style={{padding: 8}}>
                    <CmIdBox noLink noTooltip variant="small"
                        txHash={txHash}
                        txValidationIndex={txValidationIndex}
                    />
                </div>
            }
        >
            <Link to={`page://aleth.io/cm?txHash=${txHash}&validationIndex=${txValidationIndex}`}>
                <ThemeContext.Consumer>
                    {(theme: ITheme) =>
                        <Bubble
                            size={size}
                            wrapperSize={theme.spacing.bubbleWrapperSize}
                            backgroundColor={active ? theme.colors.contractColorCode : theme.colors.txSidebarItem}
                            borderColor={active ? theme.colors.contractColorCode : theme.colors.txSidebarItemActive}
                        />
                    }
                </ThemeContext.Consumer>
            </Link>
        </Tooltip>
    );
};
