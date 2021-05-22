const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth')

const User = require('../models/User');


// @route Post api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
  const { username, password } = req.body

  // simple validate
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username or password'})
  }
    
  try {
    // Check for existing user
    const user = await User.findOne({username});
    if (user)
      res.status(400).json({ success: false, message: 'User already exists'})
    
    // All good
    const hashedPassword = await argon2.hash(password)
    const newUser = new User({username, password: hashedPassword})
    await newUser.save()
 
    // Return token
    const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
    res.json({ success: true, message: 'User created success', accessToken: accessToken })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internet server maintain' })
  }
})

// @route Get api/auth
// desc Check if user is logged in
// @access public
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password') 
    if (!user) return res.status(400).json({ success: false, message: 'User not found' })
    res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internet server maintain' })
  }
})

// @route Post api/auth/login
// @desc Sign in user
// @access public
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    return res.status(400).json({ success: false, message: 'Missing username or password'})
  try {
    // Check for existing user
    const user = await User.findOne({username})
    if (!user)
      return res.status(400).json({ success: false, message: 'Incorrect username or password' })
    
    // username found
    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid)
      return res.status(400).json({ success: false, message: 'Incorrect username or password' })
    

    const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)

    res.json({ success: true, message: 'User login success', accessToken: accessToken })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internet server maintain' })
  }
})


module.exports = router;
