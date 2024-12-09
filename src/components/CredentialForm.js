import React, { useState } from "react";
import { ethers } from "ethers";
import "../styles/CredentialForm.css"; 

const CredentialForm = () => {
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [institution, setInstitution] = useState("");
  const [transactionHash, setTransactionHash] = useState(""); // transaction hash
  const [credentialHash, setCredentialHash] = useState("");   // credential hash
  const [message, setMessage] = useState(""); 

  const handleCredentialSubmit = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      alert("MetaMask is required to issue a credential.");
      return;
    }

    try {
      console.log("Requesting MetaMask accounts...");
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const latestBlock = await provider.getBlockNumber();
      console.log("Latest block number:", latestBlock);

      if (latestBlock < 1) {
        throw new Error("Hardhat node is not synchronized. Please restart your node.");
      }

      const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const abi = [
        {
          "inputs": [
            { "internalType": "string", "name": "hash", "type": "string" },
            { "internalType": "string", "name": "studentName", "type": "string" },
            { "internalType": "string", "name": "course", "type": "string" },
            { "internalType": "string", "name": "institution", "type": "string" },
            { "internalType": "uint256", "name": "issueDate", "type": "uint256" }
          ],
          "name": "issueCredential",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);

      console.log("Validating inputs...");
      if (!studentName || !course || !institution) {
        alert("All fields are required!");
        return;
      }

      console.log("Student Name:", studentName);
      console.log("Course:", course);
      console.log("Institution:", institution);

      console.log("Generating credential hash...");
      const hash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(studentName + course + institution + Date.now())
      );

      setCredentialHash(hash); 
      console.log("Generated credential hash:", hash);

      console.log("Preparing transaction...");
      const issueDate = Math.floor(Date.now() / 1000); 
      console.log("Issue Date (Unix Timestamp):", issueDate);

      const tx = await contract.issueCredential(
        hash,
        studentName,
        course,
        institution,
        issueDate,
        { gasLimit: 3000000 } 
      );

      console.log("Transaction sent. Waiting for confirmation...");
      await tx.wait();

      setTransactionHash(tx.hash); 
      setMessage(`Credential issued successfully! Transaction Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Error issuing credential:", error);

      if (error.message.includes("Hardhat node is not synchronized")) {
        setMessage("Hardhat node is out of sync. Please restart the node.");
      } else if (error.code === -32603) {
        setMessage("Transaction failed. Please check the contract or input data.");
      } else if (error.code === 4001) {
        setMessage("Transaction was rejected by the user.");
      } else if (error.code === "INSUFFICIENT_FUNDS") {
        setMessage("The account does not have enough ETH for the transaction.");
      } else {
        setMessage(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="credential-form-container">
      <div className="credential-form">
        <h2>Issue a Credential</h2>
        <form onSubmit={handleCredentialSubmit}>
          <label>Student Name</label>
          <input
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />

          <label>Course</label>
          <input
            type="text"
            placeholder="Enter course name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />

          <label>Institution</label>
          <input
            type="text"
            placeholder="Enter institution name"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
          />

          <button type="submit">Issue Credential</button>
        </form>

        {message && <p className="message">{message}</p>}

        {transactionHash && (
          <div className="transaction-details">
            <h3>Transaction Details</h3>
            <p><strong>Transaction Hash:</strong> {transactionHash}</p>
            <p><strong>Credential Hash:</strong> {credentialHash}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CredentialForm;
