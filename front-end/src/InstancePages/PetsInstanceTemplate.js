import React from 'react'
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import CustomMap from '../GeneralPages/GoogleMap';
import PropTypes from 'prop-types'

const InstancePageTemplate = ({ attributes, fetchPage }) => {
    let history = useHistory();
    // Depending on which link is clicked, useHIstory is used to redirect to that page.
    const redirect = (type, num, path) => {
        fetchPage(type, num)
        history.push(path)
    }
    return (
        <div>
            <div style={{ paddingLeft: "20vw", paddingRight: "20vw" }}>
                {/* Image of the adoptable pet for first media type. */}
                <Row>
                    <Image src={attributes.imgSrc} fluid style={{ width: '100%', height: '750px' }} />
                </Row>
            </div>
            <div style={{ paddingLeft: "20vw", paddingRight: "20vw", paddingTop: "4vh" }}>
                <Card style={{ width: '60vw', backgroundColor: '#00008b', color: 'white' }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '8vh' }}>{attributes.breed}</Card.Title>
                        <Card.Subtitle style={{ fontSize: '4vh' }} className="mb-2 text-muted">{attributes.name}</Card.Subtitle>
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
                                <Row style={{ paddingTop: '2vh' }}>
                                    <h4>Description</h4>
                                    {attributes.description}
                                </Row>
                            </Container>
                        </Card.Text>
                        <Row>
                            <h4>Adoption Center Location</h4>
                            <div style={{ width: '100vw', height: '100vh' }}>
                                {/* Google Map component is used to display the adoption center's location of this pet for second media type. */}
                                <CustomMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=
                                              AIzaSyCD6X1ARbFEh9eXKDW4EbN-kNIHz-_dlaM`}
                                    lat={attributes.adoptCenter.lat}
                                    lng={attributes.adoptCenter.lon}
                                    loadingElement={<div style={{ height: "100%" }}></div>}
                                    containerElement={<div style={{ height: "100%" }}></div>}
                                    mapElement={<div style={{ height: "100%" }}></div>}
                                />
                            </div>
                        </Row>
                        {/* Links to adoption center this pet is at, or information about its breed are provided here. */}
                        <Row style={{ paddingTop: '2vh' }}>
                            <Col>
                                <Button variant="link" style={{ textDecoration: 'none', color: '#add8e6' }} onClick={() => redirect("sb", attributes.speciesBreeds.api_id, `/sbmodel/${attributes.speciesBreeds.api_id}`)}>
                                    <h5>Breed Information Page</h5>
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="link" style={{ textDecoration: 'none', color: '#add8e6' }} onClick={() => redirect("ac", attributes.adoptCenter.api_id, `/acmodel/${attributes.adoptCenter.api_id}`)}>
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
    attributes: {
        breed: '', name: '', size: '', age: '', color: '', sex: '',
        description: 'No description avaialable :(', imgSrc: '', mapSrc: '',
        adoptCenter: { api_id: 12, name: 'Cat Rescue of Maryland, Inc.' },
        speciesBreeds: { api: 208 }
    }
}
// Set type of the prop here.
InstancePageTemplate.propTypes = {
    attributes: PropTypes.object,
    fetchPage: PropTypes.func
}

export default InstancePageTemplate
