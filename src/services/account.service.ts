import { ENS } from "@fairdatasociety/fdp-contracts";
import { Alchemy, Network } from "alchemy-sdk";
import { BigNumber, providers, Wallet } from "ethers";
import { MIN_BALANCE } from "../constants/constants";
import { Account } from "../model/general.types";
import { RegisterResponse } from "../model/internal-messages.model";
import { getEnsConfig } from "../utils/ens.utils";

const ensConfig = getEnsConfig();

const provider = new providers.JsonRpcProvider(ensConfig.ensOptions.rpcUrl);

const ens = new ENS(ensConfig.ensOptions, provider, ensConfig.ensDomain);

const alchemy = new Alchemy({
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
});
export async function generateWallet(): Promise<RegisterResponse> {
  try {
    const wallet = Wallet.createRandom();
    const account = await wallet.getAddress();

    return {
      account,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };
  } catch (error) {
    console.error(`auth.listeer: Couldn't generate mnemonic`, error);
    throw error;
  }
}

export async function getAccountBalance(account: Account): Promise<BigNumber> {
  return provider.getBalance(account);
}

export async function checkMinBalance(
  account: Account,
  minBalance = MIN_BALANCE
): Promise<boolean> {
  const balance = await getAccountBalance(account);

  return balance.gte(minBalance);
}

export async function estimateGas(
  username: string,
  account: string,
  publicKey: string
): Promise<BigNumber> {
  const [amount, price] = await Promise.all([
    ens.registerUsernameEstimateGas(username, account, publicKey),
    alchemy.core.getGasPrice(),
  ]);

  return price.mul(BigNumber.from(amount));
}
