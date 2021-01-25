let Controller = artifacts.require("Controller");

module.exports = function(deployer,network,accounts) {
  // deployment steps
  deployer.deploy(Controller,accounts[0]);
};
