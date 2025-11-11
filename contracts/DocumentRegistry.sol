// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DocumentRegistry {
    struct Document {
        string ipfsHash;
        string fileHash;
        uint256 timestamp;
    }

    mapping(address => Document[]) public userDocuments;
    mapping(string => address) public documentOwner;

    event DocumentStored(address indexed user, string ipfsHash, string fileHash, uint256 timestamp);

    function storeDocument(string memory _ipfsHash, string memory _fileHash) external {
        Document memory newDoc = Document(_ipfsHash, _fileHash, block.timestamp);
        userDocuments[msg.sender].push(newDoc);
        documentOwner[_fileHash] = msg.sender;
        emit DocumentStored(msg.sender, _ipfsHash, _fileHash, block.timestamp);
    }

    function verifyDocument(string memory _fileHash) external view returns (bool, string memory, uint256) {
        address owner = documentOwner[_fileHash];
        if (owner == address(0)) {
            return (false, "", 0);
        }
        Document[] memory docs = userDocuments[owner];
        for (uint256 i = 0; i < docs.length; i++) {
            if (keccak256(bytes(docs[i].fileHash)) == keccak256(bytes(_fileHash))) {
                return (true, docs[i].ipfsHash, docs[i].timestamp);
            }
        }
        return (false, "", 0);
    }

    function getDocumentHistory(address _user) external view returns (Document[] memory) {
        return userDocuments[_user];
    }
}


