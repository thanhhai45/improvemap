import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
function About(){
  return(
    <Row className='mt-5' style={{marginRight: 0}}>
      <Col className="text-center">
        <Button 
          variant="primary"
          hef="https://github.com/thanhhai45"
          size="lg"
        >
          Visit my github. Thanks You!
        </Button>
      </Col>

    </Row>
  )
}

export default About
