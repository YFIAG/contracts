pragma solidity ^0.6.12;
import "../../interfaces/yearn/IStrategy.sol";

contract StrategyStub is IStrategy{
    constructor () public{

    }
    function want() external view override returns (address){
        return address(0);
    }

    function deposit() external override{

    }

    // NOTE: must exclude any tokens used in the yield
    // Controller role - withdraw should return to Controller
    function withdraw(address) external override{

    }

    // Controller | Vault role - withdraw should always return to Vault
    function withdraw(uint256) external override{

    }

    function skim() external override{

    }

    // Controller | Vault role - withdraw should always return to Vault
    function withdrawAll() external override returns (uint256){
        return 0;
    }

    function balanceOf() external view override returns (uint256){
        return 0;
    }
}
