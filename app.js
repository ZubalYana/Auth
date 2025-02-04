const express = require('express')
const path = require('path')
const PORT = 3000;
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const JWT_SECRET = 'secret_jwt_words'
const app = express()

mongoose.connect(`mongodb+srv://root:CdLeejqYl0BDpKLE@cluster0.raizszz.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log(`Connected to mongoDB`)
})

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const User = mongoose.model('User', userSchema);
  
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static('public'));
  
  app.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    try {
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      res.status(400).json({ message: 'User already exist' });
    }
  });
  
  app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true });
  });
  
  const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Changed from req.cookie.token to req.cookies.token
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  
  app.get('/homepage', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
  });
  
  app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  
app.listen(PORT, ()=>{
    console.log(`Server works on PORT: ${PORT}`)
})