export const CHAIN_CONFIG = {
  ethereum: {
    id: 5, // Goerli
    name: "Ethereum",
    domain: 0,
    tokenMessenger: "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5",
    messageTransmitter: "0x26413e8157CD32011E726065a5462e97dD4d03D9",
    usdc: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
  },
  avalanche: { 
    id: 43113, // Fuji
    name: "Avalanche",
    domain: 1,
    tokenMessenger: "0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0",
    messageTransmitter: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
    usdc: "0x5425890298aed601595a70ab815c96711a31bc65",
  }
};

export const CIRCLE_API_URL = "https://api.circle.com/v2";

export const FAST_FINALITY = 1000;
export const REGULAR_FINALITY = 2000;
