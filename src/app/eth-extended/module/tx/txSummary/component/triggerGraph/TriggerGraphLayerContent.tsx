import * as React from "react";
import { observer } from "mobx-react";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { ITranslation } from "plugin-api/ITranslation";
import { IGraphData } from "app/eth-extended/data/tx/graph/IGraphData";
import { TxGraphStore } from "app/eth-extended/data/tx/graph/TxGraphStore";
import { LoadingBox } from "app/shared/component/LoadingBox";
import { ILogger } from "plugin-api/ILogger";
import { GraphSelectFieldKey } from "./SelectFields";
import { InlineModule } from "plugin-api/component/InlineModule";
import { IModuleInlineDef } from "plugin-api/IModuleInlineDef";
import { IGraphProps } from "react-graph-vis";
import { injectGlobal } from "@alethio/ui/lib/styled-components";
import { withInternalNav, IInternalNav } from "plugin-api/withInternalNav";

interface IGraphContext {
    txHash: string;
    graphType: string;
}

type VisEdge = import("vis").Edge;
type VisNode = import("vis").Node;
type PrepdGraphData = Exclude<import("react-graph-vis").IGraphProps<VisNode, VisEdge>["graph"], undefined>;

const events: (internalNav: IInternalNav) => import("react-graph-vis").IGraphProps<{}, {}>["events"] =
(internalNav) => ({
    doubleClick: (event) => {
        if (!event.nodes.length) {
            // we clicked on an edge
            return;
        }
        let pageUri = "";
        if (event.nodes[0].split("_")[0] === "Account") {
            pageUri = `page://aleth.io/account?accountHash=${event.nodes[0].split("_")[1]}`;
        } else if (event.nodes[0].split("_")[0] === "Tx") {
            pageUri = `page://aleth.io/tx?txHash=${event.nodes[0].split("_")[1]}`;
        } else {
            const hashParts = event.nodes[0].split("_");
            pageUri = `page://aleth.io/cm?txHash=${hashParts[1]}&validationIndex=${hashParts[2]}`;
        }
        let resolvedUrl = internalNav.resolve(pageUri);
        if (!resolvedUrl) {
            return;
        }

        const win = window.open(resolvedUrl, "_blank");
        if (!win) {
            return;
        }
        win.focus();
    }
});

const accountSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="41">` +
    `<foreignObject x="0" y="0" width="100%" height="100%">` +
    `<div xmlns="http://www.w3.org/1999/xhtml"
    style="padding: 3px; border: 1px solid #99A7C2; border-radius: 100%; background-color: white">` +
    `<div xmlns="http://www.w3.org/1999/xhtml"
        style="padding: 9px; border-radius: 100%; border: 1px solid rgba(167, 181, 209, 0.4);
        background-color: white;">` +
    `<div xmlns="http://www.w3.org/1999/xhtml"
        style="height: 12px; width: 12px; transform: rotate(45deg); background-color: #99A7C2">` +
    `</div>` +
    `</div>` +
    `</div>` +
    `</foreignObject>` +
    `</svg>`;

const contractMsgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="41">` +
    `<foreignObject x="0" y="0" width="100%" height="100%">` +
    `<div xmlns="http://www.w3.org/1999/xhtml"
    style="padding: 3px; border: 1px solid #FF9F1C; border-radius: 100%; background-color: white">` +
    `<div xmlns="http://www.w3.org/1999/xhtml"
        style="padding: 7px 9px 7px 12px; border-radius: 100%; border: 1px solid rgba(255, 159, 28, 0.4);
        background-color: white;">` +
    `<div xmlns="http://www.w3.org/1999/xhtml"
        style="width: 0; height: 0; border-style: solid; border-width: 8px 0 8px 12px;
        border-color: transparent transparent transparent #ffa01c;">` +
    `</div>` +
    `</div>` +
    `</div>` +
    `</foreignObject>` +
    `</svg>`;

const txSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="41" height="41">` +
    `<foreignObject x="0" y="0" width="100%" height="100%">` +
    `<div xmlns="http://www.w3.org/1999/xhtml"
    style="padding: 3px; border: 1px solid #273656; border-radius: 100%; background-color: white">` +
    `<div xmlns="http://www.w3.org/1999/xhtml"
        style="padding: 7px; border-radius: 100%; border: 1px solid rgba(39, 54, 86, 0.4);
        background-color: white;">` +
    `<div xmlns="http://www.w3.org/1999/xhtml"
        style="height: 16px; width: 16px; border-radius: 100%; background-color: #273656">` +
    `</div>` +
    `</div>` +
    `</div>` +
    `</foreignObject>` +
    `</svg>`;

const txUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(txSvg);
const contractMsgUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(contractMsgSvg);
const accountUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(accountSvg);

const options: vis.Options = {
    layout: {
        hierarchical: {
            enabled: true,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: "LR",        // UD, DU, LR, RL
            sortMethod: "directed"   // hubsize, directed
        }
    },
    physics: {
        enabled: false
    },
    interaction: {
        tooltipDelay: 0
    },
    edges: {
        color: {
            color: "black"
        },
        dashes: true,
        title: "triggersMsg",
        label: "triggersMsg",
        font: {
            size: 10,
            align: "middle",
            bold: {
                color: "#343434",
                size: 14, // px
                face: "arial",
                // TODO: is this wrong in the docs?
                vadjust: 0 as any,
                mod: "bold"
            }
        }
    },
    nodes: {
        title: "test",
        color: "white" as any,
        shape: "image",
        font: {
            color: "black" as any,
            multi: "md",
            size: 12,
            align: "bottom"
        }
    }
};

const removeDashes = (values: any) => {
    values.dashes = false;
    values.width = 3;
};

const GRAPH_ADAPTER_NAME = "graph";

let globalStylesInjected = false;

export interface ITriggerGraphLayerContentProps {
    txHash: string;
    txGraphStore: TxGraphStore;
    graphType: GraphSelectFieldKey;
    translation: ITranslation;
    logger: ILogger;
    internalNav: IInternalNav;
}
@observer
class $TriggerGraphLayerContent extends React.Component<ITriggerGraphLayerContentProps> {
    private dataModule: IModuleInlineDef<
        IGraphProps<VisNode, VisEdge>, IGraphContext, { translation: ITranslation }
    > = {
        dataAdapters: [{
            alias: GRAPH_ADAPTER_NAME,
            def: {
                contextType: {
                    txHash: "string",
                    graphType: "string"
                },
                load: ctx => this.loadGraphData(ctx)
            }
        }],
        getContentComponent: async () => (await import("react-graph-vis")).default,
        getContentProps: ({asyncData}) => ({
            graph: asyncData.get(GRAPH_ADAPTER_NAME)!.data as PrepdGraphData,
            events: events(this.props.internalNav),
            options,
            style: { height: "100%", width: "100%", position: "absolute", top: 0, left: 0 } as React.CSSProperties
        }),
        getErrorPlaceholder: ({ translation }) =>
            <ErrorBox colors="secondary">{translation.get("general.noData.text")}</ErrorBox>,
        getLoadingPlaceholder: ({ translation }) =>
            <LoadingBox colors="secondary" translation={translation} />
    };

    constructor(props: ITriggerGraphLayerContentProps) {
        super(props);

        if (!globalStylesInjected) {
            /* TODO: find a way to inject a React component inside the react-graph-vis tooltip content */
            // tslint:disable-next-line:no-unused-expression
            injectGlobal`
                .vis-tooltip {
                    color: #273656;
                    z-index: 9990;
                    position: absolute;
                    padding: 6px 16px 7px;
                    background-color: white;
                    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.1);
                    font-size: 16px;
                    letter-spacing: 0.6px
                }
            `;
            globalStylesInjected = true;
        }
    }

    private async loadGraphData({ txHash, graphType }: IGraphContext) {
        let data: IGraphData | undefined;
        if (graphType === GraphSelectFieldKey.Message) {
            try {
                data = await this.props.txGraphStore.fetchMessageGraphData(txHash);
            } catch (e) {
                this.props.logger.error(`Couldn't fetch message graph data`, e);
            }
        } else if (graphType === GraphSelectFieldKey.Account) {
            try {
                data = await this.props.txGraphStore.fetchAccountInteractionGraphData(txHash);
            } catch (e) {
                this.props.logger.error(`Couldn't fetch account interaction graph data`, e);
            }
        } else if (graphType === GraphSelectFieldKey.Trigger) {
            try {
                data = await this.props.txGraphStore.fetchTriggerGraphData(txHash);
            } catch (e) {
                this.props.logger.error(`Couldn't fetch trigger graph data`, e);
            }
        } else {
            throw new Error(`Unexpected graphType ${graphType}`);
        }

        if (data) {
            return this.prepareGraphData(data);
        }
        return data;
    }

    private abbreviate(str: string) {
        const split = str.split("_0x");
        const hex = split.pop()!;
        const kind = split.pop()!.split("/").pop();
        return kind + " " + hex.substr(0, 4) + ".." + hex.substr(-4, 4);
    }
    private getIconType(type: string) {
        const tempType = type.split("_")[0];
        if (tempType === "Tx") {
            return txUrl;
        } else if (tempType === "ContractMsg") {
            return contractMsgUrl;
        } else if (tempType === "Account") {
            return accountUrl;
        }
        return "";
    }
    private getNodeColor(type: string) {
        const tempType = type.split("_")[0];
        if (tempType === "Tx") {
            return "#273656";
        } else if (tempType === "ContractMsg") {
            return "#FF9F1C";
        } else if (tempType === "Account") {
            return "#99A7C2";
        }
        return "";
    }
    private prepareGraphData(data: IGraphData) {
        let preparedEdges: VisEdge[] = (data.edges || []).map((item) => {
            let color = {color: this.getNodeColor(item.from)};
            return {
                from: item.from,
                to: item.to,
                label: item.type.toUpperCase(),
                color,
                arrows: "to",
                dashes: [1, 2],
                chosen: {
                    label: false,
                    edge: removeDashes
                },
                font: {
                    size: 10,
                    color: color.color,
                    face: "Barlow-Bold"
                }
            };
        });
        let preparedNodes: VisNode[] = (data.nodes || []).map((item) => {
            return {
                id: item.id,
                title: item.id,
                image: this.getIconType(item.id),
                label: void 0,
                hiddenLabel: this.abbreviate(item.id),
                // TODO: figure out if color is wrong in .d.ts
                color: this.getNodeColor(item.id) as any
            };
        });

        let preparedData: PrepdGraphData = {
            edges: preparedEdges,
            nodes: preparedNodes
        };

        return preparedData;
    }

    render() {
        let context: IGraphContext = { txHash: this.props.txHash, graphType: this.props.graphType };

        return <InlineModule
            moduleDef={this.dataModule}
            context={context}
            logger={this.props.logger}
            extraContentProps={{
                translation: this.props.translation
            }}
        />;
    }
}

export const TriggerGraphLayerContent = withInternalNav($TriggerGraphLayerContent);
