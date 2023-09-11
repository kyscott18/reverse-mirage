// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

import {solmateERC721} from "./solmateERC721.sol";

contract ERC721 is solmateERC721 {
    string private baseTokenURI;

    constructor(string memory _name, string memory _symbol, string memory _baseTokenURI)
        solmateERC721(_name, _symbol)
    {
        baseTokenURI = _baseTokenURI;
    }

    function mint(address to, uint256 id) external {
        _mint(to, id);
    }

    function burn(uint256 id) external {
        _burn(id);
    }

    function tokenURI(uint256) public view virtual override returns (string memory) {
        return baseTokenURI;
    }
}
