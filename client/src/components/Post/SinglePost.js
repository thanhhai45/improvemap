import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

const SinglePost = ({post: { _id, status, title, description, url }}) => {
  let statusColor = ''
  if (status === 'LEARNED') {
    statusColor = 'success'
  } else if (status === 'LEARNING') {
    statusColor = 'warning'
  } else {
    statusColor = 'danger'
  }
  return (
    <Card 
    className="shadow" 
    border={statusColor}
  >
    <Card.Body>
      <Card.Title>
        <Row>
          <Col>
            <p className="post-title">{title}</p>
            <Badge pill variant={statusColor}>{status}</Badge>
          </Col>
          <Col className="text-right">
            <ActionButtons url={url} _id={_id}/>
          </Col>
        </Row>
      </Card.Title>
      <Card.Text>
        {description}
      </Card.Text>
    </Card.Body> 
  </Card>
  )
} 

export default SinglePost
