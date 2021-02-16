// let ERC20 = artifacts.require("ERC20");
const ERC20Mock = artifacts.require('ERC20Mock');

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(ERC20Mock,"Token","TKN", '1000000');
};
