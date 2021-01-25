pragma solidity ^0.6.12;

interface FeeDistribution {
    function claim(address) external returns (uint256);
}
