import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, Card, Modal, Button, ListGroup, Image } from 'react-bootstrap'
import PropTypes from 'prop-types'

const InstancePageTemplate = ({ attributes, medicalHistory }) => {
    const [showModal, setShowModal] = useState(false)

    const showHandler = () => {
        setShowModal(true)
    }
    const hideHandler = () => {
        setShowModal(false)
    }
    return (
        <div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw"}}>
                <Row>
                    <Image src={attributes.imgSrc} fluid style={{width: '100%', height: '750px'}}/>
                </Row>
            </div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw", paddingTop: "4vh"}}>
            <Card style={{ width: '60vw' }}>
            <Card.Body>
                <Card.Title style={{fontSize: '8vh'}}>{attributes.breed}</Card.Title>
                <Card.Subtitle style={{fontSize: '4vh'}} className="mb-2 text-muted">{attributes.name}</Card.Subtitle>
                <Card.Text>
                    <Container>
                        <Row>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Size : {attributes.size}</ListGroup.Item>
                                <ListGroup.Item>Age : {attributes.age}</ListGroup.Item>
                                <ListGroup.Item>Color : {attributes.color}</ListGroup.Item>
                                <ListGroup.Item>Sex : {attributes.sex}</ListGroup.Item>
                            </ListGroup>
                        </Row>
                        <Row style={{paddingTop: '2vh'}}>
                            <h4>Description</h4>
                            <p>{attributes.description}</p>
                        </Row>
                    </Container>
                </Card.Text>
                <Row style={{paddingBottom: "2vh"}}>
                <Button variant="primary" onClick={showHandler}>
                    Medical History
                </Button>
                <Modal show={showModal} onHide={hideHandler}>
                    <Modal.Header closeButton>
                    <Modal.Title>Medical History</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{medicalHistory}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={hideHandler}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                </Row>
                <Card.Link href="#">Adoption Center</Card.Link>
            </Card.Body>
            </Card>
            </div>
        </div>
    )
}

// Set defaults of props here.
InstancePageTemplate.defaultProps = {
    attributes: { breed: '', name: '', size: '', age: '', color: '', sex: '',
                  description: 'No description avaialable :(', imgSrc: ''},
    medicalHistory: 'Insert medical history'
}
// Set type of the prop here.
InstancePageTemplate.propTypes = {
    attributes: PropTypes.object,
    medicalHistory: PropTypes.string
}

export default InstancePageTemplate
