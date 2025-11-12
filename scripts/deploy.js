const { ethers, artifacts } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const DocumentRegistryV2 = await ethers.getContractFactory("DocumentRegistryV2");
  const contract = await DocumentRegistryV2.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("DocumentRegistryV2 deployed to:", address);

  const artifact = await artifacts.readArtifact("DocumentRegistryV2");
  const out = { address, chainId: 11155111, abi: artifact.abi };
  const outPath = path.join(__dirname, "..", "src", "lib", "contract-config.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log("Wrote", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});


