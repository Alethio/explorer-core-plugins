import * as React from "react";
import { StackBar } from "@alethio/ui/lib/data/vis/stackBar/StackBar";
import { TxType } from "app/shared/data/tx/TxType";
import { ITranslation } from "plugin-api/ITranslation";
import { ITheme } from "@alethio/explorer-ui/lib/ITheme";
import { withTheme } from "@alethio/explorer-ui/lib/styled-components";
import { BlockSummaryTooltipText } from "./BlockSummaryTooltipText";
import { roundPercentages } from "app/helper/roundPercentages";
import { ITxLiteFull } from "app/shared/data/tx/lite/ITxLiteFull";

export interface IBlockSummaryProps {
    transactions: ITxLiteFull[];
    translation: ITranslation;
    theme?: ITheme;
}

class $BlockSummary extends React.PureComponent<IBlockSummaryProps> {
    render() {
        return (
            <StackBar defaultBarHeight={8} maxBarHeight={12} minBarHeight={4} items={this.buildData()} />
        );
    }

    private buildData() {
        const colors = new Map<TxType, string>()
            .set(TxType.Value, this.props.theme!.colors.txTypeValue)
            .set(TxType.Create, this.props.theme!.colors.txTypeCreate)
            .set(TxType.Call, this.props.theme!.colors.txTypeCall);

        let countPerType = new Map<TxType, number>();
        this.props.transactions.forEach(tx => {
            countPerType.set(tx.type, (countPerType.get(tx.type) || 0) + 1);
        });
        let totalCount = [...countPerType.values()].reduce((acc, current) => acc + current, 0);

        let dataItems = [...countPerType.keys()].sort().map(type => {
            let count = countPerType.get(type)!;
            return {
                type,
                count,
                percent: count / totalCount * 100
            };
        });

        // Round percentages so that they still add to 100%
        let roundedItems = roundPercentages(dataItems);

        return roundedItems.map(roundedItem => {
            let type = roundedItem.originalItem.type;
            let color = colors.get(type);
            if (!color) {
                throw new Error(`TransactionType "${TxType[type]}" has no color defined`);
            }
            let label = this.props.translation.get("general.tx.type." + TxType[type]);
            let count = roundedItem.originalItem.count;
            let percent = roundedItem.percent;

            return {
                count,
                color,
                label,
                tooltip:
                    <BlockSummaryTooltipText
                        count={count}
                        color={color}
                        label={label}
                        percent={percent}
                        translation={this.props.translation}
                    />
            };
        });
    }
}

export const BlockSummary = withTheme($BlockSummary);
