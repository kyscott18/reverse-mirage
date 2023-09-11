// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

import {solmateERC1155} from "./solmateERC1155.sol";

contract ERC1155 is solmateERC1155 {
    string private baseURI;

    constructor(string memory _baseURI) {
        baseURI = _baseURI;
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) external {
        _mint(to, id, amount, data);
    }

    function burn(address from, uint256 id, uint256 amount) external {
        _burn(from, id, amount);
    }

    function uri(uint256) public view virtual override returns (string memory) {
        return baseURI;
    }
}
