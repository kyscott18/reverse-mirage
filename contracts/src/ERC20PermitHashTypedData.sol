// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {ERC20Permit} from "./ERC20Permit.sol";

contract ERC20PermitHashTypedData is ERC20Permit {
    constructor(string memory _name, string memory _symbol, uint8 _decimals) ERC20Permit(_name, _symbol, _decimals) {}

    function hashTypedData(address owner, address spender, uint256 value, uint256 deadline)
        external
        view
        returns (bytes32)
    {
        return keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR(),
                keccak256(
                    abi.encode(
                        keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"),
                        owner,
                        spender,
                        value,
                        nonces[owner],
                        deadline
                    )
                )
            )
        );
    }
}
