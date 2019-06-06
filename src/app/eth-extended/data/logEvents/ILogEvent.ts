export interface ILogEventInput {
    name: string;
    type: string;
    value?: string;
    components?: ILogEventInput[];
}
export interface IDecodedLogEvent {
    event: string;
    topic0: string;
    inputs?: ILogEventInput[];
}

export interface ILogEvent {
    eventDecoded?: IDecodedLogEvent;
    eventDecodedError?: string;
    hasLogTopics: string[];
    logData: string;
}
