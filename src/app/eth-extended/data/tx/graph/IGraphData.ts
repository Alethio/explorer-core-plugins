export interface IGraphData {
    edges: {
        to: string;
        from: string;
        type: string
    }[];
    nodes: {
        id: string;
        type: string;
    }[];
}
