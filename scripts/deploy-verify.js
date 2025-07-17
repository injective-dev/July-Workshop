const { ethers, run } = require("hardhat");

// 3. 自定义 gasPrice
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // 部署 TestTokenA
  const TokenA = await ethers.getContractFactory("TestToken");
  const tokenA = await TokenA.deploy("Token A", "TKA", ethers.parseEther("1000000"));
  await tokenA.waitForDeployment();
  console.log("TokenA deployed to:", await tokenA.getAddress());

  // 部署 TestTokenB
  const TokenB = await ethers.getContractFactory("TestToken");
  const tokenB = await TokenB.deploy("Token B", "TKB", ethers.parseEther("1000000"));
  await tokenB.waitForDeployment();
  console.log("TokenB deployed to:", await tokenB.getAddress());

  // 部署 SimpleSwap
  const SimpleSwap = await ethers.getContractFactory("SimpleSwap");
  const swap = await SimpleSwap.deploy(await tokenA.getAddress(), await tokenB.getAddress());
  await swap.waitForDeployment();
  console.log("SimpleSwap deployed to:", await swap.getAddress());

  // 授权 Swap 合约使用代币
  await tokenA.approve(await swap.getAddress(), ethers.parseEther("10000"));
  await tokenB.approve(await swap.getAddress(), ethers.parseEther("10000"));
  console.log("Tokens approved for SimpleSwap");

  // 等几秒，确保节点已同步
  console.log("Waiting 10 seconds before adding liquidity...");
  await new Promise((resolve) => setTimeout(resolve, 10000));

  // 添加初始流动性
  await swap.addLiquidity(ethers.parseEther("1000"), ethers.parseEther("1000"));
  console.log("Liquidity added to SimpleSwap");

  // // 等几秒，确保节点已同步 bytecode
  // console.log("Waiting 60 seconds before verification...");
  // await new Promise((resolve) => setTimeout(resolve, 60000));

  // // 验证合约
  // await run("verify:verify", {
  //   address: await swap.getAddress(),
  //   constructorArguments: [
  //     await tokenA.getAddress(),
  //     await tokenB.getAddress(),
  //   ],
  // });
  // console.log("✅ Contract verified successfully!");


}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});