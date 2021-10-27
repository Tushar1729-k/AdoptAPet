import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Modal, Button, ListGroup, Image } from 'react-bootstrap'
import { Link, BrowserRouter as Router, useHistory } from "react-router-dom";
import CustomMap from '../GeneralPages/GoogleMap';
import PropTypes from 'prop-types'

const InstancePageTemplate = ({ attributes, medicalHistory, fetchPage }) => {
    const [showModal, setShowModal] = useState(false)

    const showHandler = () => {
        setShowModal(true)
    }
    const hideHandler = () => {
        setShowModal(false)
    }
    let history = useHistory();

    const redirect = (type, num, path) => {
        fetchPage(type, num)
        history.push(path)
    }

    useEffect(() => {
        window.onbeforeunload = function() {
            return true;
        };
    
        return () => {
            window.onbeforeunload = null;
        };
    }, [])
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
                    <div style={{width: '100vw', height: '100vh'}}>
                    <CustomMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=
                                              AIzaSyCD6X1ARbFEh9eXKDW4EbN-kNIHz-_dlaM`}
                        lat={attributes.adoptCenter.lat}
                        lng={attributes.adoptCenter.lon}
                        loadingElement={<div style={{height: "100%"}}></div>}
                        containerElement={<div style={{height: "100%"}}></div>}
                        mapElement={<div style={{height: "100%"}}></div>}
                    />
                    </div>
                </Row>
                <Row style={{paddingTop: '2vh'}}>
                    <Col>
                        <Button variant="link" style={{textDecoration: 'none'}} onClick={() => redirect("sb", attributes.speciesBreeds.api_id, `/sbmodel/${attributes.speciesBreeds.api_id}`)}>
                            <h5>Breed Information Page</h5>
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="link" style={{textDecoration: 'none'}} onClick={() => redirect("ac", attributes.adoptCenter.api_id, `/acmodel/${attributes.adoptCenter.api_id}`)}>
                            <h5>This pet is at the {attributes.adoptCenter.name}</h5>
                        </Button>
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
                  adoptCenter: {api_id: 12, name: 'Cat Rescue of Maryland, Inc.'},
                  speciesBreeds: {api: 208}},
    medicalHistory: { allergies: 'Not available', diet: 'Not available', 
                      issues: 'Not available', hearing: 'Not available',
                      sight: 'Not available', orgId: '198', sbId: '' }
}
// Set type of the prop here.
InstancePageTemplate.propTypes = {
    attributes: PropTypes.object,
    medicalHistory: PropTypes.object,
    fetchPage: PropTypes.func
}

export default InstancePageTemplate
