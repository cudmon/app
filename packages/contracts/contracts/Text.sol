// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.28;

contract Text {
    string private text;

    constructor(string memory _text) {
        text = _text;
    }

    function set(string memory _text) public {
        text = _text;
    }

    function get() public view returns (string memory) {
        return text;
    }
}
