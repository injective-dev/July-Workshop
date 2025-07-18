# Workshop: 从 0 到 1 玩转 Injective EVM

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

脚本：

deploy-verify.js: 部署testoken.sol, swap.sol 并添加流动性池
deploy-erc20.js: 部署BankERC20 代币

# BankERC20: 使用 Injective EVM 创建的原生 denom 代币, 可以被Injective Bank module, Exchange module直接使用交互。


# verify 命令：npx hardhat verify --network injEVM [contract address] [parameters...]