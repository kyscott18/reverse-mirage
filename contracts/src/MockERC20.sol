// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {ERC20 as solmateERC20} from "../lib/solmate/src/tokens/ERC20.sol";

contract MockERC20 is solmateERC20 {
    constructor(string memory _name, string memory _symbol, uint8 _decimals) solmateERC20(_name, _symbol, _decimals) {}

    function mint(address to, uint256 value) public virtual {
        _mint(to, value);
    }

    function burn(address from, uint256 value) public virtual {
        _burn(from, value);
    }
}
