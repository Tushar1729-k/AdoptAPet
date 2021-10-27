import React from 'react'
import { Container, Row, Col, Card, Badge, ListGroup, Button } from 'react-bootstrap'
import { Link, BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import CustomMap from '../GeneralPages/GoogleMap';
import PropTypes from 'prop-types'
import { InfoCircleFill, PatchPlusFill } from 'react-bootstrap-icons';

const AdoptInstanceTemplate = ({attributes, fetchPage}) => {
    const services = attributes.services.split(",")
    const badgeTypes = ["secondary", "success", "danger", "warning", "info", "light", "dark"]
    let history = useHistory();

    const redirect = (type, num, path) => {
        fetchPage(type, num)
        history.push(path)
    }
    return (
        <div>
            <div style={{paddingLeft: "15vw", paddingRight: "15vw", paddingTop: "4vh"}}>
            <Card style={{ width: '70vw' }}>
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
                <Row>
                    <div style={{width: '100vw', height: '100vh'}}>
                    <CustomMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=
                                              AIzaSyCD6X1ARbFEh9eXKDW4EbN-kNIHz-_dlaM`}
                        lat={attributes.lat}
                        lng={attributes.lon}
                        loadingElement={<div style={{height: "100%"}}></div>}
                        containerElement={<div style={{height: "100%"}}></div>}
                        mapElement={<div style={{height: "100%"}}></div>}
                    />
                    </div>
                </Row>
                <Row style={{paddingTop: '2vh'}}>
                    <Col>
                    <h5>See breeds this center carries</h5>
                    {attributes.speciesBreeds.map((sb, idx) => (
                        <Button key={idx} variant="link" style={{textDecoration: 'none'}} onClick={() => redirect("sb", sb.api_id, `/sbmodel/${sb.api_id}`)}>
                            <h5>{sb.breed_name}</h5>
                        </Button>
                    ))}
                    </Col>
                    <Col>
                    <h5>Pets available at this center
                    </h5>
                        {attributes.pets.map((pet, idx) => (
                            <Button key={idx} variant="link" style={{textDecoration: 'none'}} onClick={() => redirect("ap", pet.api_id, `/apmodel/${pet.api_id}`)}>
                                <h5>Take a look at {pet.name}</h5>
                            </Button>
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
                  phone: '', email: '', site: 'NA', species: '',
                  services: '', petId: '', sbId: '', mapSrc: '', imgSrc: '',
                  speciesBreeds: [{api_id: 1, name: ''}], pets: [{api_id: 1, name: ''}],
                  lat: 0, lon: 0}
}
// Set type of the prop here.
AdoptInstanceTemplate.propTypes = {
	attributes: PropTypes.object,
    fetchPage: PropTypes.func
}

export default AdoptInstanceTemplate
