import { JsonRpcProvider } from "ethers";
import { ETHEREUM_RPC_URL } from "@/env";

export const rpc = new JsonRpcProvider(ETHEREUM_RPC_URL);
