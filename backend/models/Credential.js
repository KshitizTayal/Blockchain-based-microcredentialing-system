const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  blockchainHash: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Credential", credentialSchema);
