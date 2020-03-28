import { ethers } from "ethers";

export const provider = new ethers.providers.JsonRpcProvider(
  process.env.PROVIDER_URL || "http://localhost:8545"
);
export const wallet = new ethers.Wallet(
  "0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773", // Default private key for ganache-cli -d
  provider
);
export const getRandomAddress = (): string => {
  const w = ethers.Wallet.createRandom();
  return w.address;
};
export const sleep = (ms: any) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Hacky way to wait for ganache
// so ethers doesn't timeout (2mins)
export const tryAndWait = async (f: any) => {
  try {
    const tx = await f;

    // @ts-ignore
    try {
      await tx.wait();
    } catch {
      // @ts-ignore
    }
  } catch (e) {
    const eStr = e.toString().toLowerCase();
    if (eStr.includes("timeout") || eStr.includes("invalid response - 0")) {
      await sleep(2 * 60 * 1000); // Sleep for 2 more minute after timeout
    } else {
      throw e;
    }
  }
};
