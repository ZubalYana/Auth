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
  

app.listen(PORT, ()=>{
    console.log(`Server works on PORT: ${PORT}`)
})