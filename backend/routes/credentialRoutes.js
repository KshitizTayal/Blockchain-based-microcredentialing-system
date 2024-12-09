const express = require("express");
const {
  createCredential,
  getAllCredentials,
  getCredentialById,
} = require("../controllers/credentialController");
const router = express.Router();

router.post("/", createCredential);

router.get("/", getAllCredentials);

router.get("/:id", getCredentialById);

module.exports = router;
