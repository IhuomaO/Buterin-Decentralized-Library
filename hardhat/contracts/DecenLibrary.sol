// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DecenLibrary {
    //Variables
    mapping(address => string[]) public _uploadedCIDS; //Variable to track the uploaded cids of an address

    //FUNCTION 01
    //first upload
    function _upload(string[] memory _cidsToUpload) public {
        _uploadedCIDS[msg.sender] = _cidsToUpload;
    }

    //FUNCTION 02
    //subsequent uploads
    function _subsequentUpload(string[] memory _newCidsToUpload) public {
        // string[] calldata _uploadedCIDSArray;
        string[] memory _existingCIDS;
        _existingCIDS = _getListOfUploadedCIDS(msg.sender);
        string[] memory _updatedCIDS;
        _updatedCIDS = _addTwoArrays(msg.sender, _newCidsToUpload); //helper function 1
        _uploadedCIDS[msg.sender] = _updatedCIDS;
    }

    //FUNCTION 03
    //view all your uploads
    function _getListOfUploadedCIDS(address _address)
        public
        view
        returns (string[] memory)
    {
        return _uploadedCIDS[_address];
    }

    //HELPER FUNCTION 01
    function _addTwoArrays(address _address, string[] memory _newCidsToUpload)
        public
        returns (string[] memory)
    {
        string[] storage _updatedCIDS = _uploadedCIDS[_address]; //create an array that references the existing one in the mapping
        for (uint8 i = 0; i < _newCidsToUpload.length; i += 1) {
            _updatedCIDS.push(_newCidsToUpload[i]); //add the items from the new one to the old one
        }
        return _updatedCIDS; //final array is updated
    }

    //HELPER FUNCTION 02
    //return ether balance of the wallet calling the function
    function viewBalance() internal view returns (uint256) {
        return msg.sender.balance;
    }
}
