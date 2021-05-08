const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')


// @route Post api/posts
// @desc Create post
// @access Private
//
router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body
  // Simple validate
  if (!title)
    return res.status(400).json({ success: false, message: 'Title is required' })
  
  try {
    let urlCustom = url.startsWith('https://') ? url : `https://${url}`
    const newPost = new Post({
      title,
      description,
      url: urlCustom,
      status: status || 'TO LEARN',
      user: req.userId
    })
    
    await newPost.save()

    res.json({success: true, message: 'Happy learning', post: newPost})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internet server maintain'})
  }
})

module.exports = router
