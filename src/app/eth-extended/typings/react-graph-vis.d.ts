declare module "react-graph-vis" {
    export interface IGraphProps<T extends vis.Node, U extends vis.Edge> {
        options?: vis.Options;
        events?: Partial<Record<vis.NetworkEvents, (params?: any) => void>>;
        graph?: {
            nodes: T | T[];
            edges: U | U[];
        };
        style?: React.CSSProperties;
        getNetwork?(network: vis.Network): void;
        getNodes?(nodes: vis.DataSet<T>): void;
        getEdges?(edges: vis.DataSet<U>): void;
    }

    export default class Graph<T, U> extends React.Component<IGraphProps<T, U>> {

    }
}
