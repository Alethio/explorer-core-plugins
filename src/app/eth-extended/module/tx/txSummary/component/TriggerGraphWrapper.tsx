import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { TriggerGraphLayer } from "./triggerGraph/TriggerGraphLayer";
import { TxGraphStore } from "app/eth-extended/data/tx/graph/TxGraphStore";
import { Button } from "@alethio/ui/lib/control/Button";
import { BubbleChartIcon } from "@alethio/ui/lib/icon/BubbleChartIcon";
import { ILogger } from "plugin-api/ILogger";

export interface ITriggerGraphWrapperProps {
    txGraphStore: TxGraphStore;
    txHash: string;
    translation: ITranslation;
    logger: ILogger;
}

@observer
export class TriggerGraphWrapper extends React.Component<ITriggerGraphWrapperProps> {
    @observable
    private layerVisible = false;

    render() {
        let { translation: tr } = this.props;

        return (
            <>
                <Button Icon={BubbleChartIcon} colors="secondary" onClick={this.handleLayerToggle}>
                    {tr.get("txView.content.txSummary.triggerGraph.button")}
                </Button>
                <TriggerGraphLayer
                    open={this.layerVisible}
                    onRequestClose={this.handleLayerToggle}
                    txHash={this.props.txHash}
                    txGraphStore={this.props.txGraphStore}
                    translation={tr}
                    logger={this.props.logger}
                />
            </>
        );
    }

    private handleLayerToggle = () => {
        this.toggleLayer();
    }

    private toggleLayer() {
        this.layerVisible = !this.layerVisible;
    }
}
