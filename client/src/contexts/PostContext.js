import { createContext, useReducer } from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl } from './constants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
  // State
  const [ postState, dispatch] = useReducer(postReducer, {
    post: [],
    postLoading: true
  })


  // Get all Posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`)
      if (response.data.success) {
        dispatch({type: 'POST_LOADED_SUCCESS', payload: response.data.post})
      }
    } catch (error) {
      /* handle error */
      return error.response.data ? error.response.data : { success: false, message: 'Server error'}
    }
  }

  // Post context data
  const postContextData = { postState, getPosts }


  return (
    <PostContextProvider value={postContextData}>{children}</PostContextProvider>
  )
}

export default PostContextProvider
