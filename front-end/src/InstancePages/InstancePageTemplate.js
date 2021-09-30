import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, Card, Modal, Button, ListGroup } from 'react-bootstrap'
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
            <div style={{paddingLeft: "20vw", paddingRight: "20vw", paddingTop: '10vh'}}>
            <Card style={{ width: '60vw' }}>
            <Card.Body>
                <Card.Title style={{fontSize: '8vh'}}>{attributes.breed}</Card.Title>
                <Card.Subtitle style={{fontSize: '4vh'}} className="mb-2 text-muted">{attributes.name}</Card.Subtitle>
                <Card.Text>
                    <Container>
                        <Row>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Weight : {attributes.weight} lbs</ListGroup.Item>
                                <ListGroup.Item>Age : {attributes.age}</ListGroup.Item>
                                <ListGroup.Item>Color : {attributes.color}</ListGroup.Item>
                                <ListGroup.Item>Sex : {attributes.sex}</ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Container>
                </Card.Text>
                <Card.Link href="#">Adoption Center</Card.Link>
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
            </Card.Body>
            </Card>
            </div>
        </div>
    )
}

// Set defaults of props here.
InstancePageTemplate.defaultProps = {
    attributes: { breed: '', name: '', weight: '', age: '', color: '', sex: ''},
    medicalHistory: 'Insert medical history'
}
// Set type of the prop here.
InstancePageTemplate.propTypes = {
    attributes: PropTypes.object,
    medicalHistory: PropTypes.string
}

export default InstancePageTemplate
