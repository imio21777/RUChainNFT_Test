# 容易踩的坑

#### **你需要拥有的**
+ 以太坊钱包（推荐 Rabby，但要手动导入Sepolia Testnet）
+ Alchemy 账号/ Infura 账号
+ Pinata 账号存储 NFT 数据
+ Sepolia Testnet 上的 ETH 测试币
+ Node
+ Hardhat
+ solc 解释器

#### **用npm来管理包**

*建议是对每一个项目都单独来管理，需要先*
```
    $ npm init
    $ npm list // 查看已经安装的包
```

*由于包版本之间不兼容的问题，建议按照安装如下树所示的版本*

```
├── @alch/alchemy-web3@1.4.7
├── @nomiclabs/hardhat-ethers@2.2.3
├── @openzeppelin/contracts@5.0.2
├── dotenv@16.4.5
└── ethers@5.7.2
// 树中所显示包的足够本次开发
```

过程中可能会警告之类的，但必须这样装才能运行，就算用 audit fix --force 也没有办法处理所有 vulnerability，而且还会造成包版本的冲突。

#### **网页文件**

把网页文件放在根目录下的 docs 文件夹中，上传到 github 仓库去 settings 中的 pages 页面就可以自动生成属于这个仓库的链接，免去自己操作的其他烦恼。

关于 contractInfo.json 文件中的 contractABI，直接复制进去实在太大，故另用 contractInfo 文件保存。

# 未解决的问题

#### **本地无法 mint NFT**

无论是直接用localhost还是部署出网页，都不能够直接用钱包mint nft，具体报错是
![alt text](<截屏2024-09-02 18.37.21.png>)
```
Fail to create
{"code":-32005,"message":"rate limit exceeded"}
```

一开始认为是 RPC 封禁了，换了另外两个 Alchemy 的 RPC 仍然失败，再次切换 Infura 的 RPC 依旧无法 mint。

最后从手机端进网页 mint 发现可行，部署者和其他账号均可以 mint。

*不知道为什么在电脑上不可以，尚未解决此问题。*

#### **无法在链浏览器上验证合约**

直接提交 .sol 发现缺少 import 的文件，尝试使用打包的方法（扁平化），但相关工具已经年久失修。

也许用 truffle 的打包是可行的，但未采用 truffle 开发，此路放弃。

GPT 提供一种用 hardhat-etherscan 包的方式，但目前也已停用。

*暂未找到很好的验证方式通过合约检测*

#### **链浏览器上不显示NFT对应的图片**

曾以为是 ipfs 的 CID 填写有误，第二遍做的时候换成了 http:// 开始的一串，结果还是没有显示。

*目前尚未找到原因*

# 期待的改进

- **解决已经提到的问题**
- **Connect Wallet 做成如今市场所见的多钱包选项**
- **不同图片的 NFT 部署**
- **将 connectapp 中的函数单独抽离，更新逻辑，从而清晰的实现其他合约**

# 参考
全部部署极大依赖于 https://ethereum.org/zh/developers/tutorials/how-to-write-and-deploy-an-nft/#write-deploy
