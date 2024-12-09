require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.0", // Use the Solidity version of your smart contract
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Local Ethereum node (Hardhat)
      chainId: 31337, // Default Hardhat network chain ID
    },
  },
};
