# DApp 开发指南

**技术栈**：React + Ethers.js + Hardhat + Solidity

---

## 目录

1. [DApp前端开发基础](#DApp前端开发基础)
2. [环境准备](#环境准备)
3. [项目结构](#项目结构)
4. [智能合约开发](#智能合约开发)
5. [前端集成](#前端集成)
6. [本地测试与部署](#本地测试与部署)
7. [测试网部署](#测试网部署)
8. [引用来源](#引用来源)

---

## DApp前端开发基础

### Ethers.js

- **简介 ：**Ethers.js是一个轻量级的JavaScript库，用于与以太坊区块链及智能合约交互。它支持钱包连接、合约调用、交易签名等功能，适用于构建去中心化应用（DApp）的前端

- **核心功能 ：**
  - Provider ：连接以太坊节点（如Infura、Alchemy或MetaMask） 【1 4】 。
  - 合约交互 ：通过合约地址和ABI创建合约实例，调用读取（ view ）或写入（ transaction ）函数 【1 4】 。
  - 交易处理 ：自动计算Gas费用，支持自定义Gas参数 【 1 6】 。
  
- **官网 ：** [Ethers.js官方文档](https://docs.ethers.org/v6/)

### WalletConnect

- **简介 ：**WalletConnect是一个开源协议，允许DApp通过二维码或深层链接与多种钱包（如MetaMask、Trust Wallet）建立安全连接，支持多链兼容
- **集成步骤 ：**
  - 安装依赖： @walletconnect/web3-provider 和 web3 【2】 。
  - 配置RPC提供者（如Infura），生成WalletConnect实例并与DApp集成【 2 5】 。
- **协议支持 ：**
  - **EIP-1193 ：**标准化DApp与钱包的通信接口 【3 5】 。
  - **EIP-6963 ：**解决多钱包共存时的冲突问题 【3 5】 。
- **官网:** [WalletConnect官方文档](https://docs.reown.com/)

## Solidity与Hardhat

### Solidity

- **简介 ：**Solidity是以太坊智能合约的编程语言，语法类似JavaScript，支持继承、库和复杂类型，专为区块链场景设计 6 7 8
- **学习资源 ：**
  - **官网 ：** [Solidity英文文档](https://soliditylang.org/) | [中文文档（旧版)](https://solidity-cn.readthedocs.io/zh/develop/)
  - **开发工具 ：**
    - **Remix ：**在线IDE，支持编译、调试和部署【 6 7】 。
    - **Hardhat ：**本地开发环境，集成测试和部署功能 【9 11】 。

### Hardhat

- **简介 ：**Hardhat是一个以太坊开发框架，提供智能合约编译、测试、部署和调试的一体化环境，内置本地测试网（Hardhat Network） 【9 11 】。
- **核心功能 ：**
  - 测试 ：支持TypeScript，快速运行单元测试 【9 10 】。
  - 插件系统 ：兼容Ethers.js、Waffle等工具 【10 11】 。
  - 调试 ：提供交易回放和堆栈追踪功能 【11】 。
- **官网 ：** [Hardhat英文文档](https://hardhat.org/) | [中文文档](https://learnblockchain.cn/docs/hardhat/)

## 综合开发示例

- DApp全栈项目：可结合React/Vue、Hardhat和RainbowKit（钱包UI组件库）构建全栈应用，实现钱包登录、合约交互等功能【 5 9 】
- 工具链推荐 ：
  - 前端 ：React + Ethers.js + RainbowKit。
  - 合约开发 ：Hardhat + Solidity + OpenZeppelin。
  - 测试网部署 ：使用Infura/Alchemy的RPC节点 【1 9】 。


## 环境准备

- **Node.js**：v18+
- **MetaMask**：安装浏览器插件并创建钱包【4 12】
- **开发工具**：

```bash
  # 全局安装 Yarn 和 Hardhat
  npm install -g yarn hardhat
```

## 项目结构

```
my-dapp/
├── chain/                  # Hardhat 项目目录
│   ├── contracts/         # Solidity 合约
│   ├── scripts/           # 部署脚本
│   ├── test/              # 单元测试
│   └── hardhat.config.ts  # 网络配置
├── webapp/                # React 前端
│   ├── src/
│   │   └── components/    # Ethers.js 交互组件
│   └── package.json
└── README.md
```

## 智能合约开发

### 1.初始化 Hardhat 项目

```bash
mkdir chain && cd chain
yarn init -y
yarn add hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init  # 选择 TypeScript 模板
```

### 2.编写合约（示例： Greeter.sol ）

```sol
// contracts/Greeter.sol
pragma solidity ^0.8.0;

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
```

### 3.部署脚本

```ts
// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  console.log("Greeter deployed to:", greeter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## 前端集成

### 1.初始化 React 项目

```bash
npx create-react-app webapp --template typescript
cd webapp
yarn add ethers @walletconnect/web3-provider
```

### 2.连接 MetaMask

```tsx
// src/components/WalletConnector.tsx
import { ethers } from "ethers";

const connectWallet = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    return signer.address;
  } else {
    alert("请安装 MetaMask！");
  }
};
```

### 3.集成 WalletConnect（示例）

```ts
import WalletConnectProvider from "@walletconnect/web3-provider";

const provider = new WalletConnectProvider({
  infuraId: "YOUR_INFURA_KEY",
});

await provider.enable();
```

## 本地测试与部署

### 1.启动本地节点

```bash
npx hardhat node  # 启动本地测试网（端口 8545）
```

### 2.部署合约

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

### 3.配置 MetaMask

- 网络名称 ： Hardhat Local
- RPC URL ： <http://127.0.0.1:8545>
- Chain ID ： 31337

## 测试网部署

### 1.修改 Hardhat 配置

```ts
// hardhat.config.ts
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_KEY",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};
```

### 2.部署到测试网

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

## 引用来源

1. [介绍DApp 开发：前端与合约交互（ethers.js）](https://mp.weixin.qq.com/s?__biz=MzkwNDgwMTY5Mw==&mid=2247484265&idx=2&sn=7cbbe65ba961e917d44fb537d1e9724e&chksm=c19699ba692881a34c785cc3f5b8122b93b98598b71cdeaf5d37350b6712fbf5222af944ba5d#rd)
2. [将WalletConnect集成到Vue.js DApps中](https://zhuanlan.zhihu.com/p/588378484)
3. [学习链接web3钱包的底层原理](https://mp.weixin.qq.com/s?__biz=Mzk0NTI2NDgxNQ==&mid=2247498660&idx=1&sn=601197e15a94d8e1465f373d45d6f595&chksm=c22ce8641d72e4c62ac72422c3447ab6e0e54f6924f4a447212727f420b298d10a113fa011a3#rd)
4. [使用 React 和 ethers.js 构建DApp](https://mp.weixin.qq.com/s?__biz=MzU5NzUwODcyMw==&mid=2247497935&idx=2&sn=01e78c70b8675baf9f43e8216349f593&chksm=fe50efd3c92766c569f87f140c888de123cca41fa2541bd7a9fd38e2c1e8ff93759ddadda6f2#rd)
5. [前端程序员如何玩转Web3轻松开发DApp全栈项目（React+TS）](https://mp.weixin.qq.com/s?__biz=MzIzMzQ0NDUwNQ==&mid=2247505352&idx=1&sn=b9a6de4fc9a81fb6acc6dec54f5cf3ea&chksm=e9db72970214cd892bedcb3faf370a65b14a7523c88c03e24c363c33b3de7eabc8e769c3b6c1#rd)
6. [Solidity学习常用网址](https://blog.csdn.net/liuhandsomes/article/details/104174506)
7. [合约编程语言 Solidity](https://mp.weixin.qq.com/s?__biz=MzI3OTg3ODQwOQ==&mid=2247485205&idx=1&sn=5747cfc3ab2c820856ea2344ded9636b&chksm=eac8bafa7394cb3abf0d86c18220c52fcebcffbfcd5664e9503fde6f91f63826ad24e7b73146#rd)
8. [合约编程语言 Solidity](https://zhuanlan.zhihu.com/p/44046040)
9. [使用hardhat开发以太坊智能合约-搭建环境](https://mp.weixin.qq.com/s?__biz=MzU5NzUwODcyMw==&mid=2247504033&idx=3&sn=75aeec74d61ae648f58c64d2d8743cd2&chksm=fe50c7bdc9274eab3206df87225f74ea6b679f70c174ccdc7aaa5ce95ba4d9ad3e5e0263891d#rd)
10. [数百次采访后，我总结了 2021 年最好用的区块链开发框架](https://mp.weixin.qq.com/s?__biz=MzU2ODQzNzAyNQ==&mid=2247490607&idx=1&sn=43323f8450b278263b835e4e5eba7f9b&chksm=fd5f2c15d43eeedeeefcd619eac16d4dee95b9c636ecae32c2c261ee14a2effad988180209b0#rd)
11. [Hardhat 中文文档请查收](https://mp.weixin.qq.com/s?__biz=MzU5NzUwODcyMw==&mid=2247487482&idx=1&sn=b2f89ab483a7ea2e07f1b5e502c321f1&chksm=fffba1513d24c8cf596dce021061ee04680b11e1d8d9c7d5bb40193467509772e1bedf92f977#rd)
12. [手把手教你从零搭建一款属于自己的dApp实战项目 Vue3+TS+Web3](https://mp.weixin.qq.com/s?__biz=MzIzMzQ0NDUwNQ==&mid=2247504977&idx=1&sn=bc3ee8eb7e07a1ecda67992c4f52629c&chksm=e9deba520c26e9fdd399ca75f498ffd7d4d2061a25213413e742c6d4436607b43539fa6c71d3#rd)
13. [DApp开发指南01：从零开始构建你的DApp——基础篇](https://mp.weixin.qq.com/s?__biz=MzA5NzQ3NzU1OA==&mid=2647552598&idx=1&sn=d59eecaca46f857915f0338a6edb8ee0&chksm=89312b2874794beb30bd4aa4ff000aab35b0ee53c9161f6314463077e36e74ec7ba9ed99a4fe#rd)
14. [DApp开发指南：从零开始构建你的应用](https://www.163.com/dy/article/I7P2IFTU05563X8Z.html)
15. [转型Web3开发第二课：Dapp开发入门基础 | 01 | 安装MetaMask](https://learnblockchain.cn/article/8742)
