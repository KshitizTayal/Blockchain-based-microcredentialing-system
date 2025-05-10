const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// creating user schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: false, 
  },
  googleId: {
    type: String,
    required: false, 
  },
});

// Hash the password before saving the user to the database (only for normal registrations)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip hashing if password is not modified (for Google login users)
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Continue with saving the user
});

// Compare password for normal login (for email/password users)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static method to find user by Google ID
userSchema.statics.findByGoogleId = async function (googleId) {
  return await this.findOne({ googleId });
};

module.exports = mongoose.model("User", userSchema);
