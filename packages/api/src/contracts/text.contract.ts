import { abi } from "@app/contracts/artifacts/contracts/Text.sol/Text.json";

import { rpc } from "@/libs/rpc";
import { Contract } from "ethers";
import { TEXT_CONTRACT_ADDRESS } from "@/env";

export let text: Contract;

(async () => {
  text = new Contract(TEXT_CONTRACT_ADDRESS!, abi, await rpc.getSigner());
})();
