/* global define, it, describe, before, afterEach */
const truffleAssert = require('truffle-assertions');
const { expect } = require('chai');
const bigNumber = require('bignumber.js');
const timeMachine = require('ganache-time-traveler');

const {
  constants,
  randomNumber,
  randomAddress,
  web3
} = require('../../utils/test');

const YVault = artifacts.require('yVault');
const Controller = artifacts.require("Controller");
// const ERC20 = artifacts.require("ERC20");
const StrategyStub = artifacts.require("StrategyStub");
const ERC20Mock = artifacts.require('ERC20Mock');

// describe('BreakerAsset: Destroy address', () => {

  let erc20;
  let yVault;
  let controller;
  let strategyStub;
  const addr = [];
  const SUM_OF_FRACTIONS = 1000;
  let tokenName = "Token";
  let tokenSymbol = "TKN";
  let min = 9000;
  let snapshotId;

  before(async() => {
    [
      addr.sender,
      addr.owner,
      addr.rewards,
      addr.governance,
      addr.arbitrary3,
    ] = await web3.eth.getAccounts();
    controller = await Controller.new(addr.rewards, { from: addr.sender });
    // erc20 = await TokenMock.new(tokenName, tokenSymbol, { from: addr.sender });
    erc20 = await ERC20Mock.new(tokenName, tokenSymbol, '1000000', { from: addr.sender });
    yVault = await YVault.new(erc20.address, controller.address,{ from: addr.sender });
    strategyStub = await StrategyStub.new({ from: addr.sender });
    await controller.approveStrategy(erc20.address, strategyStub.address, { from: addr.sender });
    await controller.setStrategy(erc20.address, strategyStub.address, { from: addr.sender });
    await controller.setVault(erc20.address,yVault.address,{ from: addr.sender });

    // Create a snapshot
    const snapshot = await timeMachine.takeSnapshot();
    snapshotId = snapshot['result'];
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

  afterEach(async() => {
    // console.log("REVERT");
    await timeMachine.revertToSnapshot(snapshotId);
  });

  describe('Test default values (constructors)', () => {
    //afterEach(async() => await timeMachine.revertToSnapshot(snapshotId));

    it('Vault balance is 0', async() => {
      let a = await yVault.balance();
      expect(a.toString()).to.equal("0");
    });
    it('Define Addresses(constructors)', async() => {
      expect((await controller.rewards()).toString()).to.equal(addr.rewards.toString());

    });
    it('Define UI Stuff(constructors)', async() => {
      expect((await erc20.name()).toString()).to.equal(tokenName);
      expect((await erc20.symbol()).toString()).to.equal(tokenSymbol);

    });
  });

  describe('Test default Setter', () => {
    //afterEach(async() => await timeMachine.revertToSnapshot(snapshotId));

    it('Setter setMin', async() => {
      await yVault.setMin(min);
      expect(((await yVault.min()).toString())).to.equal(min.toString());
    });
    it('Setter setController', async() => {
      await yVault.setController(controller.address);
      expect((await yVault.controller()).toString()).to.equal(controller.address.toString());
    });
    it('Setter setGovernance', async() => {
      await yVault.setGovernance(addr.governance);
      expect((await yVault.governance()).toString()).to.equal(addr.governance.toString());
    });


  });
  describe('Test default Getters', () => {


    it('Getter getPricePerFullShare', async() => {
      // await erc20.transfer(yVault.address, '500000', { from: addr.sender});
      // console.log((await yVault.totalSupply()).toString());
      await erc20.approve(await yVault.address, 1,{ from: addr.sender});
      await yVault.deposit(1, { from: addr.sender});
      let x = bigNumber(await yVault.balance());
      x=x.multipliedBy('1e+18');
      x=x.idiv(await yVault.totalSupply());
      expect((await yVault.getPricePerFullShare()).toString()).to.equal(x.toString());
    });


  });
  describe('Test balance, available, earn, depositAll, deposit, withdrawAll, harvest, withdraw', () => {
    
    it('ERC20-standart balance', async() => {
      await erc20.approve(await yVault.address, 1,{ from: addr.sender});
      await yVault.deposit(1, { from: addr.sender});
      expect((await yVault.balance()).toString()).to.equal("1");
    });

    it('ERC20-standart available', async() => {
      await erc20.approve(await yVault.address, 1,{ from: addr.sender});
      await yVault.deposit(1, { from: addr.sender});
      let x = bigNumber(await erc20.balanceOf(yVault.address));
      x=x.multipliedBy(await yVault.min());
      x=x.idiv(await yVault.max());
      expect((await yVault.available()).toString()).to.equal(x.toString());
    });

    xit('ERC20-standart earn', async() => {

    });

    it('ERC20-standart depositAll', async() => {
      await erc20.approve(await yVault.address, 1,{ from: addr.sender});
      expect((await yVault.depositAll()).toString()).to.equal((await yVault.deposit(await erc20.balanceOf(yVault.address))).toString());
    });

    it('ERC20-standart deposit', async() => {
      await erc20.approve(await yVault.address, 1,{ from: addr.sender});
      await yVault.deposit(1, { from: addr.sender});
      expect((await yVault.balance()).toString()).to.equal("1");
    });

    it('ERC20-standart withdrawAll', async() => {
      await erc20.approve(await yVault.address, 1,{ from: addr.sender});
      await yVault.deposit(1, { from: addr.sender});
      await yVault.withdrawAll( { from: addr.sender});
      
    });
    it('ERC20-standart harvest', async() => {

    });
    it('ERC20-standart withdraw', async() => {
      await erc20.approve(await yVault.address, 1,{ from: addr.sender});
      await yVault.deposit(1, { from: addr.sender});
      console.log((await yVault.balance()).toString());
      console.log((await erc20.balanceOf(await yVault.address)).toString());
      // await yVault.withdraw(1, { from: addr.sender});
    });

  });



// });
