const { ethers } = require('ethers');

/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
// require("hardhat-flattener");

const { API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.20",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`${PRIVATE_KEY}`]
      }
   },
   etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY
   }
}

