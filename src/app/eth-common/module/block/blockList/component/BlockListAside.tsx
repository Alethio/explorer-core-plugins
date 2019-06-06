import * as React from "react";
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
import { clamp } from "@puzzl/core/lib/math/number";
import { ITranslation } from "plugin-api/ITranslation";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { BlockListItem } from "./BlockListItem";
import { IBlockTxCount } from "app/shared/data/block/value/IBlockTxCount";
import { IBlockListContext } from "app/shared/context/IBlockListContext";

const BlockListAsideRoot = styled.div`
    flex: 1 1 auto;
    overflow: hidden;
`;

export interface IBlockListAsideProps {
    blockValues: (IBlockTxCount | undefined)[];
    context: IBlockListContext;
    translation: ITranslation;
}

@observer
export class BlockListAside extends React.Component<IBlockListAsideProps> {
    private wrapperElement: HTMLDivElement | null;
    private wrapperElementHeight: number;
    @observable
    private blocksShownCount: number;

    @computed
    private get blockValues() {
        let dataFrameStart = this.blockRangeStart - this.props.context.rangeStart;
        return this.props.blockValues.slice(dataFrameStart, dataFrameStart + this.blocksShownCount);
    }

    @computed
    private get blockRangeStart() {
        return clamp(
            this.props.context.blockNumber - Math.floor(this.blocksShownCount / 2),
            0,
            this.props.context.rangeEnd - (this.blocksShownCount - 1)
        );
    }

    @computed
    private get maxBlockTxCount() {
        return this.blockValues.reduce((acc, value) => Math.max(acc, !value ? 0 : value.transactionCount), 0);
    }

    render() {
        return (
            <BlockListAsideRoot
                innerRef={(r) => {
                    this.wrapperElement = r;
                    if (r) {
                        this.wrapperElementHeight = r.clientHeight;
                    }
                }}
            >
                {this.blocksShownCount ? this.blockValues.reverse().map((value, idx) => {
                    let blockNumber = this.blockRangeStart + this.blockValues.length - 1 - idx;
                    let percent = value ? Math.floor(value.transactionCount / this.maxBlockTxCount * 100) : 0;

                    return <BlockListItem
                        // Make sure each block has a different div, so that tooltips are changed correctly
                        key={blockNumber}
                        blockNumber={blockNumber}
                        transactionCount={value ? value.transactionCount : void 0}
                        active={blockNumber === this.props.context.blockNumber}
                        percent={percent}
                        translation={this.props.translation}
                    />;
                }) : null }
            </BlockListAsideRoot>
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
            this.wrapperElementHeight = this.wrapperElement.clientHeight;
            const maxNumberOfElements = this.wrapperElementHeight ?
                Math.floor(this.wrapperElementHeight / 16) :
                11;
            this.blocksShownCount = maxNumberOfElements;
        }
    }
}
