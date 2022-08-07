declare type Cluster = {
    name: Clusters;
    url: string;
};
export declare enum Clusters {
    Mainnet = "mainnet-beta",
    Testnet = "testnet",
    Devnet = "devnet",
    Localnet = "localnet"
}
export declare const DEFAULT_CLUSTER: Cluster;
export declare const CLUSTERS: Cluster[];
export declare function getClusterUrl(name: string): string;
export declare function getCluster(name: string): string;
export {};
//# sourceMappingURL=index.d.ts.map