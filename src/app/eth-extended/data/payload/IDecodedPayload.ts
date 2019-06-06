export interface IDecodedInputPayload {
    name: string;
    type: string;
    value?: string;
    components?: IDecodedInputPayload[];
}

export interface IDecodedPayload {
    methodID: string;
    method: string;
    inputs?: IDecodedInputPayload[];
    outputs?: IDecodedInputPayload[];
}
