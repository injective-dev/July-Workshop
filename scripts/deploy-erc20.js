const { ethers, run } = require("hardhat");

// 3. 自定义 gasPrice
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 部署 bankERC20代币
  const TokenA = await ethers.getContractFactory("BankToken");
  const tokenA = await TokenA.deploy("Bank A", "BA", deployer.address, {value: ethers.parseEther("1")});
  await tokenA.waitForDeployment();
  console.log("BANK token deployed to:", await tokenA.getAddress())

}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});