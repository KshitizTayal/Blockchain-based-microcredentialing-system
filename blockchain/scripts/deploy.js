const hre = require("hardhat");

async function main() {
    const Credential = await hre.ethers.getContractFactory("Credential");
    const credential = await Credential.deploy();

    await credential.deployed();
    console.log(`Credential contract deployed to: ${credential.address}`);
    console.log("ABI:", JSON.stringify(Credential.interface.format('json')));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
