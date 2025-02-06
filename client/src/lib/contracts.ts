export const tokenMessengerAbi = [
  {
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "destinationDomain", type: "uint32" },
      { name: "mintRecipient", type: "bytes32" },
      { name: "burnToken", type: "address" },
      { name: "destinationCaller", type: "bytes32" },
      { name: "maxFee", type: "uint256" },
      { name: "minFinalityThreshold", type: "uint256" }
    ],
    name: "depositForBurn",
    outputs: [{ name: "nonce", type: "uint64" }],
    stateMutability: "nonpayable",
    type: "function"
  }
];

export const messageTransmitterAbi = [
  {
    inputs: [
      { name: "message", type: "bytes" },
      { name: "attestation", type: "bytes" }
    ],
    name: "receiveMessage",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  }
];

export const usdcAbi = [
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  }
];
