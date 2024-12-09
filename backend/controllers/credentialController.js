const Credential = require("../models/Credential");

// Create a new credential (no blockchain interaction yet)
exports.createCredential = async (req, res) => {
  const { studentName, course, institution } = req.body;

  try {
    // Save the credential to the database
    const newCredential = await Credential.create({
      studentName,
      course,
      institution,
      blockchainHash: "placeholder", // Replace with blockchain hash later
    });

    res.status(201).json({ message: "Credential created successfully", newCredential });
  } catch (error) {
    console.error("Error creating credential:", error);
    res.status(500).json({ error: "Failed to create credential" });
  }
};

// Get all credentials
exports.getAllCredentials = async (req, res) => {
  try {
    const credentials = await Credential.find();
    res.status(200).json({ credentials });
  } catch (error) {
    console.error("Error fetching credentials:", error);
    res.status(500).json({ error: "Failed to fetch credentials" });
  }
};

// Get a single credential by ID
exports.getCredentialById = async (req, res) => {
  const { id } = req.params;

  try {
    const credential = await Credential.findById(id);
    if (!credential) {
      return res.status(404).json({ error: "Credential not found" });
    }

    res.status(200).json({ credential });
  } catch (error) {
    console.error("Error fetching credential:", error);
    res.status(500).json({ error: "Failed to fetch credential" });
  }
};
