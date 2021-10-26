import React from 'react'
import { Container, Row, Col, Card, ListGroup, Image } from 'react-bootstrap'
import { Link, BrowserRouter as Router } from "react-router-dom";
import PropTypes from 'prop-types'
import YoutubePlayer from '../Components/Youtube';

const SpeciesInstanceTemplate = ({attributes, fetchPage}) => {
    return (
        <div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw"}}>
                {/* <Row>
                    <Col>
                        <Image src={attributes.imgSrc[0]} fluid/>
                    </Col>
                    <Col>
                        <Image src={attributes.imgSrc[1]} fluid/>
                    </Col>
                </Row>
                <Row>
                    <Image src={attributes.imgSrc[2]} fluid style={{width: '100%'}}/>
                </Row> */}
                <Row>
                    <YoutubePlayer searchQuery={attributes.breed}/>
                </Row>
            </div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw", paddingTop: "4vh"}}>
            <Card style={{ width: '60vw' }}>
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
                <Row style={{paddingTop: '2vh'}}>
                    <Col>
                    {attributes.pets.length === 0 ? <h4>No adoptable pets available</h4> : 
                        <div>
                        <h4>See some adoptable pets</h4>
                        {/* <Router> */}
                        {attributes.pets.map((pet, idx) => (
                            <Link key={idx} to={`/apmodel/${pet.api_id}`} style={{textDecoration: 'none'}} onClick={() => fetchPage("ap", pet.api_id)}>
                                <h5>Take a look at {pet.name}</h5>
                            </Link>
                        ))}
                        {/* </Router> */}
                        </div>
                    }
                    </Col>
                    <Col>
                    {attributes.adoptCenters.length === 0 ? <h4>No adoption centers cuurrently carry this breed</h4> : 
                        <div>
                            <h4>Adoption Centers that carry this breed</h4>
                            {/* <Router> */}
                                {attributes.adoptCenters.map((center, idx) => (
                                    <Link key={idx} to={`/acmodel/${center.api_id}`} style={{textDecoration: 'none'}} onClick={() => fetchPage("ac", center.api_id)}>
                                        <h5>{center.name}</h5>
                                    </Link>
                                ))}
                            {/* </Router> */}
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
                  energy: 'NA', lifespan: '', temperament: 'NA', shedding: 'NA',
                  health: 'NA', description: 'NA', intelligence: 'NA', child_friendly: '',
                  adoptCenters: [], pets: [], wiki: ''}
}
// Set type of the prop here.
SpeciesInstanceTemplate.propTypes = {
    attributes: PropTypes.object,
    fetchPage: PropTypes.func
}

export default SpeciesInstanceTemplate
