let ERC20 = artifacts.require("ERC20");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(ERC20,"Token","TKN");
};
