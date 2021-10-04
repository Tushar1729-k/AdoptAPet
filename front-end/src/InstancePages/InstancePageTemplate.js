import React from 'react'
import { useState } from 'react'
import { Container, Row, Col, Card, Modal, Button, ListGroup, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
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
                                <ListGroup.Item>Color : {attributes.color != "" ? attributes.color : 'NA'}</ListGroup.Item>
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
                    <Modal.Body>Allergies: {medicalHistory.allergies != "" ? medicalHistory.allergies : 'NA'}</Modal.Body>
                    <Modal.Body>Diet: {medicalHistory.diet != "" ? medicalHistory.diet : 'NA'}</Modal.Body>
                    <Modal.Body>Ongoing Medical Issues: {medicalHistory.issues != "" ? medicalHistory.issues : 'NA'}</Modal.Body>
                    <Modal.Body>Hearing: {medicalHistory.hearing != "" ? medicalHistory.hearing : 'NA'}</Modal.Body>
                    <Modal.Body>Sight: {medicalHistory.sight != "" ? medicalHistory.sight : 'NA'}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={hideHandler}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                </Row>
                <Row style={{paddingTop: '2vh'}}>
                    <Link to={`/acmodel/${attributes.orgId}`} style={{textDecoration: 'none'}}><h5>Adoption Center Link</h5></Link>
                </Row>
                <Row>
                    <Col>
                        <Link to="/sbmodel" style={{textDecoration: 'none'}}>Find other Breeds</Link>
                    </Col>
                    <Col>
                        <Link to="/acmodel" style={{textDecoration: 'none'}}>Find adoption centers near you</Link>
                    </Col>
                </Row>
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
    medicalHistory: { allergies: 'Not available', diet: 'Not available', 
                      issues: 'Not available', hearing: 'Not available',
                      sight: 'Not available', orgId: '198' }
}
// Set type of the prop here.
InstancePageTemplate.propTypes = {
    attributes: PropTypes.object,
    medicalHistory: PropTypes.object
}

export default InstancePageTemplate