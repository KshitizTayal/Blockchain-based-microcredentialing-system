const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User"); 
const router = express.Router();
const client = new OAuth2Client("556900109492-mf9v67pd8j8jmb7cs0vk9v34uiutt24m.apps.googleusercontent.com");
router.post("/google-login", async (req, res) => {
    const { name, email } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          name,
          email,
          password: "", 
        });
        await user.save();
      }
  
      
      const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });   // Generating JWT token
  
      res.json({ token }); 
    } catch (error) {
      console.error("Error during Google login:", error);
      res.status(500).json({ msg: "Server error" });
    }
  });
  
  


router.post("/google-register", async (req, res) => {
  const { name, email } = req.body;
  
  try {
    
    let user = await User.findOne({ email });
    if (!user) {
      
      user = new User({
        name,
        email,
        password: "", 
      });
      await user.save();
    }

    
    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    // Send the token back
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
