import * as React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { Tooltip } from "@alethio/ui/lib/overlay/tooltip/Tooltip";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TxCountBox } from "@alethio/explorer-ui/lib/box/block/TxCountBox";
import { Link } from "plugin-api/component/Link";
import { ITranslation } from "plugin-api/ITranslation";
import { BlockListItemBar } from "./BlockListItemBar";

interface IWrapperProps {
    percent: number;
}

export const BlockListItemRoot = styled.div`
    cursor: pointer;
`;

const BlockListItemHitBox = styled.div`
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 81px;
    padding-right: 83px;

    ${BlockListItemRoot}:first-child & {
        padding-top: 0;
    }
    ${BlockListItemRoot}:last-child & {
        padding-bottom: 0;
    }
`;

const BlockListItemBarWrapper = styled<IWrapperProps, "div">("div")`
    width: ${props => props.percent}%;
    min-width: 8px;
`;

interface IBlockListItemProps {
    blockNumber: number;
    transactionCount: number | undefined;
    percent: number;
    active?: boolean;
    translation: ITranslation;
}

export class BlockListItem extends React.PureComponent<IBlockListItemProps> {
    private barEl: HTMLElement;

    render() {
        let { blockNumber, transactionCount, percent, translation: tr } = this.props;

        return (
            <BlockListItemRoot>
                <Tooltip
                    placement="right"
                    nonInteractive
                    showDelay={0}
                    hideDelay={0}
                    offset={10}
                    referenceElement={() => this.barEl}
                    content={
                        <div style={{padding: 8, display: "flex"}}>
                            <BlockNumberBox variant="small" noLink>{blockNumber}</BlockNumberBox>
                            { transactionCount !== void 0 ?
                            <TxCountBox variant="small">
                                {tr.get("blockView.content.blockSummary.txs.label")
                                    .replace(/%d/, "" + transactionCount)}
                            </TxCountBox>
                            : null }
                        </div>
                    }
                >
                    <Link to={`page://aleth.io/block?blockNumber=${blockNumber}`}>
                        <BlockListItemHitBox>
                            <BlockListItemBarWrapper percent={percent}>
                                <BlockListItemBar active={this.props.active} innerRef={ref => this.barEl = ref!} />
                            </BlockListItemBarWrapper>
                        </BlockListItemHitBox>
                    </Link>
                </Tooltip>
            </BlockListItemRoot>
        );
    }
}
