const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Credential Contract", function () {
  let Credential, credential, owner;

  beforeEach(async () => {
    Credential = await ethers.getContractFactory("Credential");
    credential = await Credential.deploy();
    await credential.deployed();
    [owner] = await ethers.getSigners();
  });

  it("Should issue a credential", async function () {
    const hash = "0x123abc";
    const studentName = "Alice";
    const course = "Blockchain Development";
    const institution = "Blockchain Academy";
    const issueDate = Date.now();

    await credential.issueCredential(hash, studentName, course, institution, issueDate);

    const storedCredential = await credential.getCredential(hash);

    expect(storedCredential.studentName).to.equal(studentName);
    expect(storedCredential.course).to.equal(course);
    expect(storedCredential.institution).to.equal(institution);
    expect(storedCredential.issueDate.toNumber()).to.equal(issueDate);
  });
});
