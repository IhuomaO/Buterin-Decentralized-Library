// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DecenLibrary {
    ///Variables
    
    //Variable to track the uploaded cids of an address
    mapping(address => string[]) public _uploadedCIDS;

    //Variable to store the list of files shared by an address
    mapping(address => string[]) sharedFiles;
    
    //variable to store the list of files shared with an address
    mapping(address => mapping(address => string[])) recipientFiles;

    //list of uploaders
    mapping(address => bool) uploaders;

    //list of recipients
    mapping(address => bool) public recipients;

    // modifier isUploader(address _from) {
    //     require(uploaders[_from], "sender is not an uploader");
    //     _;
    // }

    ///FUNCTION 01
    //first upload
    function _upload(string[] memory _cidsToUpload) public {
        _uploadedCIDS[msg.sender] = _cidsToUpload;  
        uploaders[msg.sender] = true;
    }


    ///FUNCTION 02
    //subsequent uploads
    function _subsequentUpload(string[] memory _newCidsToUpload) public {
        // string[] calldata _uploadedCIDSArray;
        string[] memory _existingCIDS;
        _existingCIDS = _getListOfUploadedCIDS(msg.sender);
        string[] memory _updatedCIDS;
        _updatedCIDS = _addTwoArrays(msg.sender, _newCidsToUpload); //helper function 1
        _uploadedCIDS[msg.sender] = _updatedCIDS;
    }

    ///FUNCTION 03
    //view all your uploads
    function _getListOfUploadedCIDS(address _address)
        public
        view
        returns (string[] memory)
    {
        return _uploadedCIDS[_address];
    }

    ///FUNCTION O4
    //A function to share files between addresses
    //_from = address of sender
    //_to = address of recipient
    function shareFile(address _from, address _to, string memory _fileCid) public {
        require(msg.sender == _from, "you are not the sender");

        sharedFiles[_from].push(_fileCid);
        recipientFiles[_from][_to].push(_fileCid);
        recipients[_to] = true;
    }

    //FUNCTION 05
    //A function to get shared files
    function getSharedFiles() public view returns(string[] memory) {
        return sharedFiles[msg.sender];
    }

    //FUNCITON 06
    //Function to get recipient files
    //_to = address of recipient
    function getRecipientFiles(address _to) public view returns(string[] memory) {
        return recipientFiles[msg.sender][_to];
    }



    ///HELPER FUNCTION 01
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

    ///HELPER FUNCTION 02
    //return ether balance of the wallet calling the function
    function viewBalance() internal view returns (uint256) {
        return msg.sender.balance;
    }
}
