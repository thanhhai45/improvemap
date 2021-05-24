import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl } from './constants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
  // State
  const [ postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading: true
  })

  const [showAddPostModal, setShowAddPostModal] = useState(false)
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null
  })

  // Get all Posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`)
      if (response.data.success) {
        dispatch({type: 'POST_LOADED_SUCCESS', payload: response.data.posts})
      }
    } catch (error) {
      /* handle error */
      dispatch({type: 'POST_LOADED_FAILED'})
    }
  }

  // add Post
  const addPost = async newPost => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost)
      if (response.data.success) {
        dispatch({type: 'ADD_POST', payload: response.data.post})
        return response.data
      }
    } catch (error) {
      /* handle error */
      return error.response.data ? error.response.data : { success: false, message: 'Server error'}
    }
  }

  // delete Post
  const deletePost = async postId => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`)
      if (response.data.success) {
        dispatch({type: 'DELETE_POST', payload: postId})
      }
    } catch (error) {
      /* handle error */
      console.log(error)
    }
  }

  // Find post need update
  const findPost = postId => {
    const post = postState.posts.find(post => post._id === postId)
    dispatch({type: 'FIND_POST', payload: post})
  } 

  // update Post
  const updatePost = async updatePost => {
    try {
      const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost)
      if (response.data.success) {
        dispatch({type: 'UPDATE_POST', payload: response.data.post})
        return response.data
      }
    } catch (error) {
      /* handle error */
      return error.response.data ? error.response.data : { success: false, message: 'Server error'}
    }
  }

  // Post context data
  const postContextData = { 
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    findPost,
    updatePost
  }


  return (
    <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>
  )
}

export default PostContextProvider
