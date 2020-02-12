import * as React from "react";
import { SidebarColumns } from "@alethio/explorer-ui/lib/layout/sidebar/SidebarColumns";
import { minMaxLogScale } from "app/helper/minMaxLogScale";
import { ThemeContext } from "plugin-api/ThemeContext";
import { ITranslation } from "plugin-api/ITranslation";
import { Logo } from "./Logo";
import { TxItem } from "./TxItem";
import { ITxBasicInfo } from "app/shared/data/tx/ITxBasicInfo";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

export interface ITxSidebarProps {
    txHash: string;
    txs: ITxBasicInfo[] | undefined;
    translation: ITranslation;
    mobileVisible: boolean;
}

export class TxSidebar extends React.Component<ITxSidebarProps> {
    render() {
        let { txs, translation: tr } = this.props;
        let bubbleSizes = txs ? minMaxLogScale(txs.map(tx => tx.value)) : [];

        return <ThemeContext.Consumer>{ (theme: ITheme) =>
            <SidebarColumns
                pageTitle={tr.get("txView.sidebar.title")}
                Logo={<Logo>{tr.get("txView.sidebar.logo")}</Logo>}
                itemSize={theme.spacing.bubbleWrapperSize}
                mobileVisible={this.props.mobileVisible}
            >{
            txs ? txs.map((tx, idx) => <TxItem
                key={tx.hash}
                txHash={tx.hash}
                size={bubbleSizes[idx]}
                wrapperSize={theme.spacing.bubbleWrapperSize}
                active={this.props.txHash === tx.hash}
            />) : undefined }
            </SidebarColumns>
        }</ThemeContext.Consumer>;
    }
}
