const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());  // Allow cross-origin requests from your frontend

// In-memory user store (for testing purposes)
let users = [];

// Secret key for JWT (store in .env in real applications)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Example route for testing
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Simple authentication endpoints
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to in-memory array (in reality, save to a database)
  const newUser = { username, email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully!' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find the user
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a JWT token
  const token = jwt.sign({ email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  // Send the token to the client
  res.status(200).json({ token });
});

// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});