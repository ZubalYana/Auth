const express = require('exress')
const path = require('path')
const PORT = 3000;
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const JWT_SECRET = 'secret_jwt_words'
const app = express()
app.listen(PORT, ()=>{
    console.log(`Server works on PORT: ${PORT}`)
})