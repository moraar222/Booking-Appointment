import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to check if the password meets the criteria
function isStrongPassword(password) {
  // Check length
  if (password.length < 8) {
    return false;
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }
  
  // Check for at least one digit
  if (!/\d/.test(password)) {
    return false;
  }
  
  // Check for at least one special character
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return false;
  }
  
  return true;
}

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Validate input
    const errors = [];
    if (!username) errors.push("Username is required!");
    if (!email) errors.push("Email is required!");
    if (!password) errors.push("Password is required!");
    if (!isStrongPassword(password)) {
      errors.push("Invalid password. Password must have at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hash,
      phone: req.body.phone, // Optional field
      city: req.body.city, // Optional field
      country: req.body.country, // Optional field
    });

    // Save new user to database
    await newUser.save();

    res.status(201).json({ message: "User has been created successfully." });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Check if JWT secret is defined
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not defined." });
    }

    // Generate JWT token with expiration time
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token,user });
  } catch (err) {
    next(err);
  }
};