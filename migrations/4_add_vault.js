let Vault = artifacts.require("yVault");
// let ERC20 = artifacts.require("ERC20");
const ERC20Mock = artifacts.require('ERC20Mock');
let Controller = artifacts.require("Controller");

module.exports = async function(deployer) {
    let controller = await Controller.deployed();
    await controller.setVault(ERC20Mock.address,Vault.address);
};
