const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')

// @route Post api/posts
// @desc Create post
// @access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({user: req.userId}).populate('user', ['username'])
    res.json({success: true, posts})
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internet server maintain' })
  }

})


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

// @route Put api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body
  // Simple validate
  if (!title)
    return res.status(400).json({ success: false, message: 'Title is required' })
  
  try {
    let urlCustom = url.startsWith('https://') ? url : `https://${url}`
    let updatePost = {
      title,
      description: description || '',
      url: urlCustom || '',
      status: status || 'TO LEARN',
    }
    const postUpdateCondition = {_id: req.params.id, user: req.userId}

    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {new: true})

    if (!updatePost)
      return res.status(401).json({ success: false, message: 'Post not found or user not authorized'})
    
    res.json({success: true, message: 'Excellent progress', post: updatePost})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internet server maintain'})
  }

})

// @route Delete api/posts
// @desc Delete epost
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = {_id: req.params.id, user: req.userId}
    const deletePost = await Post.findOneAndDelete(postDeleteCondition)
    
    if (!deletePost)
      return res.status(404).json({ success: false, message: 'Post not found or user not authorized'})
    
    res.json({success: true, post: deletePost})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internet server maintain'})
  } 
})


module.exports = router
