import * as React from "react";
import { observer } from "mobx-react";
import { computed, observable } from "mobx";
import { RelativeTimeFormatter } from "@alethio/ui/lib/util/time/RelativeTimeFormatter";
import { ITranslation } from "plugin-api/ITranslation";
import { getRelativeTimeTranslations } from "app/helper/getRelativeTimeTranslations";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { BarChart } from "@alethio/explorer-ui/lib/dashboard/BarChart";
import { ILatestBlockRangeContext } from "../../../../../shared/context/ILatestBlockRangeContext";
import { IBlockTxTimeInPool } from "app/eth-extended/data/block/txTimeInPool/IBlockTxTimeInPool";
import styled from "@alethio/explorer-ui/lib/styled-components";

const MAX_BLOCKS_SHOWN_COUNT = 50;

interface IAvgTimeInPoolChartProps {
    blockValues: (IBlockTxTimeInPool | undefined)[];
    context: ILatestBlockRangeContext;
    translation: ITranslation;
}

const TransactionCount = styled.span`
    color: ${props => props.theme.colors.blockListItem};
    padding-left: 8px;
`;
/**
 * TODO: Deduplication: This file is almost identical with BlockListDashboard.tsx.
 * If posible, export and share logic between those two and BlockListAside.tsx
 */
@observer
export class AvgTimeInPoolChart extends React.Component<IAvgTimeInPoolChartProps> {
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
                        value: data ? data.averageTimeInPool : void 0,
                        data
                    };
                })}
                tooltipThunk={(d) => <div style={{padding: 8, display: "flex"}}>
                    <ValueBox
                        colors={(theme: ITheme) => ({
                            background: theme.colors.blockColorCode,
                            text: theme.colors.blockBoxText
                        })} variant="small">
                        # {d.key as number }
                        { d.value !== void 0 ?
                            <TransactionCount>
                                {this.props.translation.get("dashboardView.pendingChart.tooltip.txs.label")
                            .replace(/%d/, this.formatInterval(d.value * 1000))}
                            </TransactionCount>
                        : null }
                    </ValueBox>
                </div>}
                linkThunk={(d) => `page://aleth.io/block?blockNumber=${d.key}`}
            />
        );
    }

    private formatInterval(interval: number) {
        return new RelativeTimeFormatter(getRelativeTimeTranslations(this.props.translation)).formatInterval(interval);
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
            /**
             * TODO: Refactor HACK. Because clientWidth includes the padding of wrapperElement
             * i must substract it before computing. Find a way to fix this.
             */
            const maxNumberOfElements = this.wrapperElementWidth ?
                Math.floor((this.wrapperElementWidth - 16) / 16) :
                12;
            this.blocksShownCount = Math.min(maxNumberOfElements, MAX_BLOCKS_SHOWN_COUNT);
        }
    }
}
