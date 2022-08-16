import { CHAT_URL } from "@/constants/globals";

const defaultSeo = {
  title: "hackblock.space",
  description: "hackblock.space enables fully decentralized, token gated chatrooms",
  openGraph: {
    url: CHAT_URL,
    title: "hackblock.space",
    description: "Token gated decentralized chatrooms on Solana",
    images: [
      {
        url: `${CHAT_URL}/seoDefaultCardImage.jpg`,
        width: 800,
        height: 600,
        alt: "Og Image Alt",
        type: "image/jpeg",
      },
    ],
    site_name: "Stratachat",
  },
  twitter: {
    handle: "@StrataProtocol",
    site: CHAT_URL,
    cardType: "summary_large_image",
  },
};

export default defaultSeo;
