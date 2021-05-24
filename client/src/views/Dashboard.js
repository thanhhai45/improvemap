import {PostContext} from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import {Button, Card, Col, OverlayTrigger, Row, Spinner, Tooltip} from 'react-bootstrap'
import SinglePost from '../components/Post/SinglePost'
import AddPostModal from '../components/Post/AddPostModal'
import UpdatePostModal from '../components/Post/UpdatePostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import Toast from 'react-bootstrap/Toast'

const Dashboard = () => {
  // Context
  const { authState: { user: { username } } } = useContext(AuthContext)
  const {
    postState: { post,  posts, postLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast
  } = useContext(PostContext)

  // Start: get all Post
  useEffect(() => getPosts(), [])
  let body = null

  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info"/>
      </div>
    )
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">
            Hi, { username }          
          </Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Note App</Card.Title>
            <Card.Text>Click the button below to track your note first time</Card.Text>
            <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}>Add New</Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post}/>
            </Col>
          ))}
        </Row>
        
        {/* Open Add Post Modal */}
        <OverlayTrigger placement="left" overlay={<Tooltip>Add a new thing to note</Tooltip>}>
          <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
            <img src={addIcon} alt="Add" width="60" height="60"/>
          </Button>
        </OverlayTrigger>
      </>
    )
  }

  return (
    <>
      {body}
      <AddPostModal/>
      { post !== null && <UpdatePostModal/>}
      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{
          position: 'fixed',
          top: '20%',
          right: '10px'
        }} 
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {show: false, message: '', type: null})}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  )
}

export default Dashboard
