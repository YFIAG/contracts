const { expect } = require('chai');
const bigNumber = require('bignumber.js');
const {
  constants,
  randomNumber,
  randomAddress,
  web3
} = require('../../../utils/test');

const YVault = artifacts.require('yVault');
const Controller = artifacts.require("Controller");
const ERC20 = artifacts.require("ERC20");
const StrategyStub = artifacts.require("StrategyStub");

describe('BreakerAsset: Destroy address', () => {

  let erc20;
  let yVault;
  let controller;
  let strategyStub;
  const addr = [];
  const SUM_OF_FRACTIONS = 1000;
  let tokenName = "Token";
  let tokenSymbol = "TKN";

  before(async() => {
    [
      addr.sender,
      addr.owner,
      addr.rewards,
      addr.arbitrary2,
      addr.arbitrary3,
    ] = await web3.eth.getAccounts();
    controller = await Controller.new(addr.rewards, { from: addr.sender });
    erc20 = await ERC20.new(tokenName, tokenSymbol, { from: addr.sender });
    yVault = await YVault.new(erc20.address, controller.address,{ from: addr.sender });
    strategyStub = await StrategyStub.new({ from: addr.sender });
    await controller.approveStrategy(erc20.address, strategyStub.address, { from: addr.sender });
    await controller.setStrategy(erc20.address, strategyStub.address, { from: addr.sender });
    await controller.setVault(erc20.address,yVault.address,{ from: addr.sender });

  });

  // const createInstance = async({
  //                                assetId = 123,
  //                                projectIds = [randomNumber(5)],
  //                                fractions = [SUM_OF_FRACTIONS],
  //                                registry = randomAddress(92),
  //                                coin = randomAddress(33),
  //                                owner = addr.sender,
  //                                from = addr.sender
  //                              } = {}) => {
  //
  // }

  xdescribe('Test default values (constructors)', () => {

    it('Define ...)', async() => {

    });

  });
  xdescribe('Test default Setter', () => {

    it('Setter ...', async() => {

    });


  });
  xdescribe('Test default Getters', () => {

    it('Getters ...', async() => {

    });


  });


});
