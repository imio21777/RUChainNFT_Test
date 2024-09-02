async function main() {
    const RUCQRCode = await ethers.getContractFactory("RUCQRCode")
  
    // Start deployment, returning a promise that resolves to a contract object
    const QRCode = await RUCQRCode.deploy()
    await QRCode.deployed()
    console.log("Contract deployed to address:", QRCode.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })