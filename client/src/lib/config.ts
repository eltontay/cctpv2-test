export const CHAIN_CONFIG = {
  ethereum: {
    id: 11155111, // Sepolia
    name: "Ethereum Sepolia",
    domain: 0,
    tokenMessenger: "0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa",
    messageTransmitter: "0xe737e5cebeeba77efe34d4aa090756590b1ce275",
    usdc: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238",
  },
  avalanche: {
    id: 43113, // Fuji
    name: "Avalanche Fuji",
    domain: 1,
    tokenMessenger: "0x8fe6b999dc680ccfdd5bf7eb0974218be2542daa",
    messageTransmitter: "0xe737e5cebeeba77efe34d4aa090756590b1ce275",
    usdc: "0x5425890298aed601595a70ab815c96711a31bc65",
  },
};

export const CIRCLE_API_URL = "https://api.circle.com/v2";

export const FAST_FINALITY = 1000;
export const REGULAR_FINALITY = 2000;
