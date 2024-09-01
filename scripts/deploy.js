// scripts/deploy.js

const { ethers } = require("hardhat");

async function main() {
    // 获取合约工厂
    const MyNFT = await ethers.getContractFactory("MyNFT");

    // 部署合约
    console.log("Deploying MyNFT contract...");
    const myNFT = await MyNFT.deploy(); // 无需传递参数，因为构造函数没有参数

    // 等待合约部署完成
    await myNFT.deployed();

    console.log(`MyNFT contract deployed to address: ${myNFT.address}`);
}

// 捕获并打印错误
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });