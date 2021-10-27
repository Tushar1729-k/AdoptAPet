import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import PropTypes from 'prop-types'
import CustomMap from '../GeneralPages/GoogleMap'
import YoutubePlayer from '../Components/Youtube';
import axios from 'axios';

const SpeciesInstanceTemplate = ({attributes, fetchPage}) => {

    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const fetchCoords = async () => {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${attributes.origin}&key=AIzaSyCD6X1ARbFEh9eXKDW4EbN-kNIHz-_dlaM`)
        setLat(res.data.results[0].geometry.location.lat)
        setLng(res.data.results[0].geometry.location.lng)
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
            <div style={{paddingLeft: "15vw", paddingRight: "15vw", paddingTop: "4vh"}}>
            <Card style={{ width: '70vw' }}>
            <Card.Body>
                <Card.Title style={{fontSize: '6vh'}}>{attributes.breed}</Card.Title>
                <Card.Subtitle style={{fontSize: '4vh'}} className="mb-2 text-muted">{attributes.species}</Card.Subtitle>
                <Card.Text>
                    <Container>
                        <Row>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Height : {attributes.height}</ListGroup.Item>
                                <ListGroup.Item>Weight : {attributes.weight}</ListGroup.Item>
                                <ListGroup.Item>Colors : {attributes.color}</ListGroup.Item>
                                <ListGroup.Item>Energy : {attributes.energy}</ListGroup.Item>
                                <ListGroup.Item>Lifespan : {attributes.lifespan}</ListGroup.Item>
                                <ListGroup.Item>Intelligence : {attributes.intelligence}</ListGroup.Item>
                                <ListGroup.Item>Child Friendly : {attributes.child_friendly}</ListGroup.Item>
                            </ListGroup>
                        </Row>
                        <Row style={{paddingTop: '2vh'}}>
                            <h4>Description</h4>
                            <p>{attributes.wiki}</p>
                        </Row>
                        <Row style={{paddingTop: '2vh'}}>
                            <h4>Temperament</h4>
                            <p>{attributes.temperament}</p>
                        </Row>
                        <Row style={{paddingTop: '2vh'}}>
                            <h4>Shedding</h4>
                            <p>{attributes.shedding}</p>
                        </Row>
                        <Row style={{paddingTop: '2vh'}}>
                            <h4>Potential Health Issues</h4>
                            <p>{attributes.health}</p>
                        </Row>
                    </Container>
                </Card.Text>
                <Row>
                    <h4>Country of Origin: {attributes.origin}</h4>
                    <div style={{paddingLeft: "27.5vw"}}>
                        <Button onClick={() => fetchCoords()}>Click to see Origin Country</Button>
                    </div>
                    <div style={{width: '100vw', height: '100vh'}}>
                    <CustomMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=
                                              AIzaSyCD6X1ARbFEh9eXKDW4EbN-kNIHz-_dlaM`}
                        lat={lat}
                        lng={lng}
                        zoom={5}
                        loadingElement={<div style={{height: "100%"}}></div>}
                        containerElement={<div style={{height: "100%"}}></div>}
                        mapElement={<div style={{height: "100%"}}></div>}
                    />
                    </div>
                </Row>
                <Row>
                <div style={{paddingTop: "4vh"}}>
                    <div style={{paddingLeft: "17.5vw"}}>
                        <h4>Click to see some videos of the {attributes.breed}!</h4>
                    </div>
                    <YoutubePlayer searchQuery={attributes.breed}/>
                </div>
                </Row>
                <Row style={{paddingTop: '2vh'}}>
                    <Col>
                    {attributes.pets.length === 0 ? <h4>No adoptable pets available</h4> : 
                        <div>
                        <h4>See some adoptable pets</h4>
                        {attributes.pets.map((pet, idx) => (
                            <Button key={idx} variant="link" style={{textDecoration: 'none'}} onClick={() => redirect("ap", pet.api_id, `/apmodel/${pet.api_id}`)}>
                                <h5>Take a look at {pet.name}</h5>
                            </Button>
                        ))}
                        </div>
                    }
                    </Col>
                    <Col>
                    {attributes.adoptCenters.length === 0 ? <h4>No adoption centers cuurrently carry this breed</h4> : 
                        <div>
                            <h4>Adoption Centers that carry this breed</h4>
                                {attributes.adoptCenters.map((center, idx) => (
                                    <Button key={idx} variant="link" style={{textDecoration: 'none'}} onClick={() => redirect("ac", center.api_id, `/acmodel/${center.api_id}`)}>
                                        <h5>{center.name}</h5>
                                    </Button>
                                ))}
                        </div>
                    }
                    </Col>
                </Row>
            </Card.Body>
            </Card>
            </div>
        </div>
    )
}

// Set defaults of props here.
SpeciesInstanceTemplate.defaultProps = {
    attributes: { breed: '', species: '', height: 'NA', weight: 'NA', color: 'NA',
                  energy: 'NA', lifespan: '', temperament: 'NA', shedding: 0,
                  health: 0, description: 'NA', intelligence: 'NA', child_friendly: '',
                  adoptCenters: [], pets: [], wiki: '', origin: ''}
}
// Set type of the prop here.
SpeciesInstanceTemplate.propTypes = {
    attributes: PropTypes.object,
    fetchPage: PropTypes.func
}

export default SpeciesInstanceTemplate
