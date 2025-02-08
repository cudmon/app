import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Text", (m) => ({
  text: m.contract("Text", ["Sometext"]),
}));
