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
                            {attributes.description}
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
                <Row>
                    <h4>Adoption Center Location</h4>
                    <Image src={attributes.mapSrc} fluid style={{width: '100%'}}/>
                </Row>
                <Row style={{paddingTop: '2vh'}}>
                    <Col>
                        <Link to={`/sbmodel/${attributes.sbId}`} style={{textDecoration: 'none'}}><h5>Breed Information Page</h5></Link>
                    </Col>
                    <Col>
                        <Link to={`/acmodel/${attributes.adoptCenter.api_id}`} style={{textDecoration: 'none'}}><h5>This pet is at the {attributes.adoptCenter.name}</h5></Link>
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
                  description: 'No description avaialable :(', imgSrc: '', mapSrc: '',
                  adoptCenter: {api_id: 12, name: 'Cat Rescue of Maryland, Inc.'}},
    medicalHistory: { allergies: 'Not available', diet: 'Not available', 
                      issues: 'Not available', hearing: 'Not available',
                      sight: 'Not available', orgId: '198', sbId: '' }
}
// Set type of the prop here.
InstancePageTemplate.propTypes = {
    attributes: PropTypes.object,
    medicalHistory: PropTypes.object
}

export default InstancePageTemplate
