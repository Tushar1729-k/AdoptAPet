import React from 'react'
import { Container, Row, Col, Card, Badge, ListGroup, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import CustomMap from '../GeneralPages/GoogleMap';
import PropTypes from 'prop-types'
import { InfoCircleFill, PatchPlusFill } from 'react-bootstrap-icons';

const AdoptInstanceTemplate = ({attributes}) => {

    // let map
    // const initMap = () => {
    //     map = new google.maps.Map(document.getElementById("map"), {
    //         center: { lat: -34.397, lng: 150.644 },
    //         zoom: 8,
    //       })
    // }
    const services = attributes.services.split(",")
    const badgeTypes = ["secondary", "success", "danger", "warning", "info", "light", "dark"]
    return (
        <div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw"}}>
                <Row>
                    <Image src={attributes.imgSrc} fluid style={{width: '100%'}}/>
                </Row>
                <Row>
                    {/* <h4>Google Maps</h4>
                    <Image src={attributes.mapSrc} fluid style={{width: '100%'}}/> */}
                    {/* <div id="map" style={{height: "500px", width: "100%"}}></div>
                    <script
                    src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCD6X1ARbFEh9eXKDW4EbN-kNIHz-_dlaM&callback=initMap&v=weekly`}
                    async
                    ></script> */}
                    <div style={{width: '100vw', height: '100vh'}}>
                    <CustomMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=
                                              AIzaSyCD6X1ARbFEh9eXKDW4EbN-kNIHz-_dlaM`}
                        loadingElement={<div style={{height: "100%"}}></div>}
                        containerElement={<div style={{height: "100%"}}></div>}
                        mapElement={<div style={{height: "100%"}}></div>}

                    />
                    </div>
                </Row>
            </div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw", paddingTop: "4vh"}}>
            <Card style={{ width: '60vw' }}>
            <Card.Body>
                <Card.Title style={{fontSize: '6vh'}}>{attributes.name}</Card.Title>
                <Card.Subtitle style={{fontSize: '4vh'}} className="mb-2 text-muted">{attributes.type}</Card.Subtitle>
                <Card.Text>
                    <Container>
                        <Row>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Species Available : {attributes.species}</ListGroup.Item>
                                <ListGroup.Item>
                                    Services Available :
                                    <div>
                                        <InfoCircleFill/>{' '}
                                        <Badge pill bg="primary">
                                            <PatchPlusFill/>{' '}Adoption
                                        </Badge>
                                        {Array.from({length: services.length}).map((_, idx) => (
                                            <Badge key={idx} pill bg={badgeTypes[idx]}>
                                                <PatchPlusFill/>{' '}{services[idx]}
                                            </Badge>
                                        ))}
                                    </div>
                                    {attributes.services}
                                </ListGroup.Item>
                                <ListGroup.Item>Address : {attributes.address}</ListGroup.Item>
                                <ListGroup.Item>City : {attributes.city}</ListGroup.Item>
                                <ListGroup.Item>State : {attributes.state}</ListGroup.Item>
                                <ListGroup.Item>Zip Code : {attributes.zip}</ListGroup.Item>
                                <ListGroup.Item>Phone : {attributes.phone}</ListGroup.Item>
                                <ListGroup.Item>Email : {attributes.email}</ListGroup.Item>
                                <ListGroup.Item>Website : {attributes.site}</ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Container>
                </Card.Text>
                <Row style={{paddingTop: '2vh'}}>
                    <Col>
                    {attributes.speciesBreeds.map((sb, idx) => (
                        <Link key={idx} to={`/sbmodel/${sb.api_id}`} style={{textDecoration: 'none'}}><h5>See a breed</h5></Link>
                    ))}
                    </Col>
                    <Col>
                        {attributes.pets.map((pet, idx) => (
                            <Link key={idx} to={`/apmodel/${pet.api_id}`} style={{textDecoration: 'none'}}><h5>Take a look at {pet.name}</h5></Link>
                        ))}
                    </Col>
                </Row>
            </Card.Body>
            </Card>
            </div>
        </div>
    )
}

// Set defaults of props here.
AdoptInstanceTemplate.defaultProps = {
    attributes: { name: '', address: '', city: '', state: '', zip: '',
                  phone: '', email: '', type: '', site: 'NA', species: '',
                  services: '', petId: '', sbId: '', mapSrc: '', imgSrc: '',
                  speciesBreeds: [], pets: []}
}
// Set type of the prop here.
AdoptInstanceTemplate.propTypes = {
	attributes: PropTypes.object
}

export default AdoptInstanceTemplate
