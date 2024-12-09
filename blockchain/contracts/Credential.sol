// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Credential {
    struct CredentialData {
        string studentName;
        string course;
        string institution;
        uint256 issueDate;
    }

    // Mapping to store credentials by their unique hash
    mapping(string => CredentialData) public credentials;

    // Event to emit credential issuance
    event CredentialIssued(string indexed hash, string studentName, string course, string institution, uint256 issueDate);

    
    function issueCredential(string memory hash,string memory studentName,string memory course,string memory institution, uint256 issueDate) 
    public {
        require(bytes(studentName).length > 0, "Student name cannot be empty");
        require(bytes(course).length > 0, "Course name cannot be empty");
        require(bytes(institution).length > 0, "Institution name cannot be empty");
        
       
        require(credentials[hash].issueDate == 0, "Credential already issued");

        
        credentials[hash] = CredentialData(studentName, course, institution, issueDate);

        // Emit the event
        emit CredentialIssued(hash, studentName, course, institution, issueDate);
    }

    // Function to retrieve credential information by hash
    function getCredential(string memory hash) public view returns (CredentialData memory) {
        require(credentials[hash].issueDate != 0, "Credential not found");
        return credentials[hash];
    }
}
