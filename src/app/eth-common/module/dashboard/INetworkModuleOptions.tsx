export interface INetworkModuleOptions {
    networkName: string;
    otherNetworks?: {
        name: string;
        url: string;
    }[];
}
