let Vault = artifacts.require("yVault");
let ERC20 = artifacts.require("ERC20");
let Controller = artifacts.require("Controller");

module.exports = async function(deployer) {
    let controller = await Controller.deployed();
    await controller.setVault(ERC20.address,Vault.address);
};
