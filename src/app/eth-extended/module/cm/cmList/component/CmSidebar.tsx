import * as React from "react";
import { observer } from "mobx-react";
import { SidebarColumns } from "@alethio/explorer-ui/lib/layout/sidebar/SidebarColumns";
import { ITranslation } from "plugin-api/ITranslation";
import { ThemeContext } from "plugin-api/ThemeContext";
import { minMaxLogScale } from "app/helper/minMaxLogScale";
import { ICmLite } from "app/eth-extended/data/contractMsg/lite/ICmLite";
import { Logo } from "./Logo";
import { CmItem } from "./CmItem";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";

export interface ICmSidebarProps {
    translation: ITranslation;
    txHash: string;
    txValidationIndex: number;
    contractMsgs: ICmLite[] | undefined;
    mobileVisible: boolean;
}

@observer
export class CmSidebar extends React.Component<ICmSidebarProps> {

    render() {
        let { translation: tr, txHash, txValidationIndex, contractMsgs: cms } = this.props;
        let bubbleSizes = cms ? minMaxLogScale(cms.map(cm => cm.value)) : [];

        return <ThemeContext.Consumer>{ (theme: ITheme) =>
            <SidebarColumns
                pageTitle={tr.get("cmView.sidebar.title")}
                Logo={<Logo>{tr.get("cmView.sidebar.logo")}</Logo>}
                itemSize={theme.spacing.bubbleWrapperSize}
                mobileVisible={this.props.mobileVisible}
            >
                {cms ? cms.map((cm, idx) => (
                    <CmItem
                        key={cm.originatorTxHash + "_" + cm.txValidationIndex}
                        txHash={cm.originatorTxHash}
                        txValidationIndex={cm.txValidationIndex}
                        size={bubbleSizes[idx]}
                        wrapperSize={theme.spacing.bubbleWrapperSize}
                        active={txHash === cm.originatorTxHash &&
                            txValidationIndex === cm.txValidationIndex}
                    />
                )) : undefined}
            </SidebarColumns>
        }</ThemeContext.Consumer>;
    }
}
