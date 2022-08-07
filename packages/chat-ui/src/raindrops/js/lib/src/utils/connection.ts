
type Cluster = {
  name: string;
  url: string;
};
export const CLUSTERS: Cluster[] = [
  {
    name: "mainnet-beta",
    url: "https://api.metaplex.solana.com/",
  },
  {
    name: "devnet",
    url: "https://solana--devnet.datahub.figment.io/apikey/fff8d9138bc9e233a2c1a5d4f777e6ad",
  },
];
export const DEFAULT_CLUSTER = CLUSTERS[2];
export function getCluster(name: string): string {
  for (const cluster of CLUSTERS) {
    if (cluster.name === name) {
      return cluster.url;
    }
  }
  return DEFAULT_CLUSTER.url;
}
