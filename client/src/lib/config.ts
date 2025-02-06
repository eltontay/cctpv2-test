export const CHAIN_CONFIG = {
  ethereum: {
    id: 11155111, // Sepolia
    name: "Ethereum",
    domain: 0,
    tokenMessenger: "0x1a9695e9dbdb443f0b8bb7626a7bf4421c22e594",
    messageTransmitter: "0x7865c6E87B9F70255377e024ace6630C1Eaa37F9",
    usdc: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
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