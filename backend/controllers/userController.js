const { db } = require('../firebaseAdmin'); // Import Firestore
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../firebaseAdmin'); // Import Firebase Admin

// Function to validate email format
const isValidEmail = (email) => {
  const regex = /^[0-9]{3}[a-z]{1}[0-9]{3}@sxc\.edu\.np$/; // Regex for student ID format
  return regex.test(email);
};

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Email must be in the format studentID@sxc.edu.np' });
  }

  try {
    // Check if the user already exists
    const userRef = db.collection('users').doc(email); // Use email as document ID
    const doc = await userRef.get();

    if (doc.exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user document
    await userRef.set({
      email,
      password, // You should hash the password before storing it
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Email must be in the format studentID@sxc.edu.np' });
  }

  try {
    const userRef = db.collection('users').doc(email);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = doc.data();

    // Check password (you should hash the password and compare)
    if (userData.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token (implement your token generation logic)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Google login
exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await admin.auth().verifyIdToken(idToken);
    const { email } = ticket;

    // Check if the email is valid
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'You must log in with an email ending in @sxc.edu.np' });
    }

    // Check if the user exists in your database
    let user = await User.findOne({ email });
    if (!user) {
      // If the user does not exist, you can create a new user
      user = new User({ email });
      await user.save();
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in with Google', error });
  }
};