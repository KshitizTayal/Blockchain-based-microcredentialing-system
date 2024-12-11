# Blockchain-based-microcredentialing-system
This repository contains the source code for a Blockchain-based Micro-Credentialing System aimed at securely issuing, verifying, and managing micro-credentials (digital certifications). The system leverages blockchain technology to ensure the authenticity and immutability of credentials, addressing issues like fraud and verification inefficiencies.

# Features

- **Decentralized Credential Storage**: Credentials are stored on a blockchain network, ensuring tamper-proof records.

- **User-Friendly Interface**: A clean and intuitive frontend for credential issuance and verification.

- **Secure and Transparent**: Employs cryptographic hashing and blockchain features to ensure data integrity.

- **Scalable Architecture**: Supports adding new users, issuing multiple credentials, and integrating with third-party systems.

- **Verification Mechanism**: Provides a quick and reliable way to verify the authenticity of issued credentials.

- **Role-Based Access Control**: Separate interfaces for administrators, issuers, and recipients for secure operations.

# Technology Stack

- **Backend**

  - **Blockchain Framework:** Ethereum

  - **Smart Contract Tools:** Hardhat, Truffle

  - **Programming Language:** Solidity, JavaScript (Node.js)

  - **Database:** MongoDB

  - **API Testing:** POSTMAN

- **Frontend**

  - **Technologies:** React.js, HTML, CSS, JavaScript, Express.js

  - **Styling:** Bootstrap 5 for responsive design

  - **Wallet Integration:** MetaMask

# Installation and Setup
- Navigate to the project directory:
  
  ```
  cd Blockchain-based-microcredentialing-system
  ```
- Install dependencies for the frontend:
  
  ```
  cd client
  npm install
  ```
- Deploy the frontend:
  
  ```
  npm start
  ```
- Start the Hardhat node:
  
  ```
  cd ../blockchain
  npx hardhat node
  ```
- Deploy the smart contract:
  
  ```
  npx hardhat run scripts/deploy.js --network localhost
  ```
# Usage
- **Credential Issuance:** Administrators can issue micro-credentials by uploading details and assigning them to recipients.
  
- **Verification:** Users or third parties can verify credentials by entering the credential hash or ID in the verification portal.
  
- **Audit Logs:** Track all credentialing activities for transparency and accountability.

