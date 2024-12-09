import React, { useState } from "react";
import { ethers } from "ethers";
import "../styles/RetrieveCredential.css"; 

const RetrieveCredential = () => {
  const [hash, setHash] = useState("");  
  const [credential, setCredential] = useState(null);  
  const [errorMessage, setErrorMessage] = useState("");  

  const handleRetrieve = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      alert("MetaMask is required to retrieve a credential.");
      return;
    }

    try {
      console.log("Requesting MetaMask accounts...");
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      
      const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; 
      const abi = [
        {
          "inputs": [{ "internalType": "string", "name": "hash", "type": "string" }],
          "name": "getCredential",
          "outputs": [
            {
              "components": [
                { "internalType": "string", "name": "studentName", "type": "string" },
                { "internalType": "string", "name": "course", "type": "string" },
                { "internalType": "string", "name": "institution", "type": "string" },
                { "internalType": "uint256", "name": "issueDate", "type": "uint256" }
              ],
              "internalType": "struct Credential.CredentialData",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);

      console.log("Retrieving credential for hash:", hash);

      const result = await contract.getCredential(hash); // get credential using hash

      setCredential({
        studentName: result.studentName,
        course: result.course,
        institution: result.institution,
        issueDate: new Date(result.issueDate * 1000).toLocaleString(), 
      });

      console.log("Retrieved Credential:", result);

    } catch (error) {
      console.error("Error retrieving credential:", error);
      setErrorMessage(`Error: ${error.message}`);

      // Handle specific errors
      if (error.message.includes("Credential not found")) {
        setErrorMessage("Credential not found for the provided hash.");
      } else if (error.code === 4001) {
        setErrorMessage("Transaction was rejected by the user.");
      } else {
        setErrorMessage("An error occurred while retrieving the credential.");
      }
    }
  };

  return (
    <div className="retrieve-credential-container">
      <div className="retrieve-credential">
        <h2>Retrieve Credential</h2>
        <form onSubmit={handleRetrieve}>
          <label>Enter Credential Hash</label>
          <input
            type="text"
            placeholder="Enter the credential hash"
            value={hash}
            onChange={(e) => setHash(e.target.value)}
            required
          />

          <button type="submit">Retrieve Credential</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {credential && (
          <div className="credential-details">
            <h3>Credential Details</h3>
            <p><strong>Student Name:</strong> {credential.studentName}</p>
            <p><strong>Course:</strong> {credential.course}</p>
            <p><strong>Institution:</strong> {credential.institution}</p>
            <p><strong>Issue Date:</strong> {credential.issueDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetrieveCredential;
