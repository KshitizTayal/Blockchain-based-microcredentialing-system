const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user function
// Register user function
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Log the password before saving it
    console.log("Password entered during registration:", password);

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // Password will be hashed in the pre-save hook in the User model
    });

    // Save the user to the database (password is hashed in the pre-save hook)
    await newUser.save();

    // Generate JWT token
    const payload = { userId: newUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Respond with user info and token
    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


// Login user function
// Login user function
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Step 2: Log the entered password and the stored password hash in DB
    console.log("Entered password:", password);  // Log the entered password
    console.log("Stored password hash:", user.password);  // Log the stored password hash

    // Step 3: Compare entered password with hashed password in DB using the model's matchPassword method
    const isMatch = await user.matchPassword(password);  // Use the matchPassword method here
    console.log("Password match result:", isMatch); // Log the result of password comparison

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Step 4: Generate a JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Step 5: Respond with user info and token
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error); // Log the error for debugging
    res.status(500).json({ error: "Server Error" });
  }
};
