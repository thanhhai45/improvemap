export const postReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'POST_LOADED_SUCCESS':
      return {
        ...state,
        posts: payload,
        postLoading: false,
      }
    case 'POST_LOADED_FAIL':
      return {
        ...state,
        posts: [],
        postLoading: false,
      }
    case 'ADD_POST':
      return {
        ...state,
        posts: [...state.posts, payload],
      }
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload )
      }
    case 'FIND_POST':
      return {
        ...state,
        post: payload 
      }
    case 'UPDATE_POST':
      const newPosts = state.posts.map(post => {
        if (post._id === payload._id) return payload
        return post
      })
      return {
        ...state,
        posts: newPosts
      }
    default:
      return state
  }
}
