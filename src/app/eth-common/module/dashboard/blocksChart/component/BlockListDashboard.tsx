import * as React from "react";
import { computed, observable } from "mobx";
import { observer } from "mobx-react";
import { ITranslation } from "plugin-api/ITranslation";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TxCountBox } from "@alethio/explorer-ui/lib/box/block/TxCountBox";
import { BarChart } from "@alethio/explorer-ui/lib/dashboard/BarChart";
import { ILatestBlockRangeContext } from "../../../../../shared/context/ILatestBlockRangeContext";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";

const MAX_BLOCKS_SHOWN_COUNT = 50;

interface IBlockListDashboardProps {
    blockValues: (IBlockTxCount | undefined)[];
    context: ILatestBlockRangeContext;
    translation: ITranslation;
}

/**
 * TODO: Deduplication: This file is almost identical with AvgTimeInPoolChart.tsx
 * If posible, export and share logic between those two and BlockListAside.tsx
 */
@observer
export class BlockListDashboard extends React.Component<IBlockListDashboardProps> {
    private wrapperElement: HTMLDivElement | null;
    private wrapperElementWidth: number;
    @observable
    private blocksShownCount = 1;

    @computed
    private get blockValues() {
        let dataFrameStart = this.blockRangeStart - this.props.context.rangeStart;
        return this.props.blockValues.slice(dataFrameStart);
    }

    @computed
    private get blockRangeStart() {
        return Math.max(0, this.props.context.rangeEnd - (this.blocksShownCount - 1));
    }

    render() {
        return (
            <BarChart
                innerRef={(r) => {
                    this.wrapperElement = r;
                    if (r) {
                        this.wrapperElementWidth = r.clientWidth;
                    }
                }}
                height={80}
                data={this.blockValues.map((data, idx) => {
                    let blockNumber = this.blockRangeStart + idx;
                    return {
                        key: blockNumber,
                        value: data ? data.transactionCount : void 0,
                        data
                    };
                })}
                tooltipThunk={(d) => <div style={{padding: 8, display: "flex"}}>
                    <BlockNumberBox variant="small" noLink>{d.key as number}</BlockNumberBox>
                    { d.value !== void 0 ?
                    <TxCountBox variant="small">
                        {this.props.translation.get("blockView.content.blockSummary.txs.label")
                            .replace(/%d/, "" + d.value)}
                    </TxCountBox>
                    : null }
                </div>}
                linkThunk={(d) => `page://aleth.io/block?blockNumber=${d.key}`}
            />
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    private handleResize = () => {
        if (this.wrapperElement) {
            this.wrapperElementWidth = this.wrapperElement.clientWidth;
            let computedStyle = getComputedStyle(this.wrapperElement);
            let lateralSpacing = parseInt(computedStyle.getPropertyValue("padding-left"), 10) +
                parseInt(computedStyle.getPropertyValue("padding-right"), 10);
            const maxNumberOfElements = this.wrapperElementWidth ?
                Math.floor((this.wrapperElementWidth - lateralSpacing) / 16) :
                12;
            this.blocksShownCount = Math.min(maxNumberOfElements, MAX_BLOCKS_SHOWN_COUNT);
        }
    }
}
