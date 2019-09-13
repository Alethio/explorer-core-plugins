export type IDataReader<T> = IDataReaderFn<T> | IDataReaderObject<T>;

export interface IDataReaderFn<T> {
    (rawData: any): T;
}

export interface IDataReaderObject<T> {
    read: IDataReaderFn<T>;
}
