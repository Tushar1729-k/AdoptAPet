import React from 'react'
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const SpeciesInstanceTemplate = ({attributes}) => {
    return (
        <div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw"}}>
                <Row>
                    <Col>
                        <Image src={attributes.imgSrc[0]} fluid/>
                    </Col>
                    <Col>
                        <Image src={attributes.imgSrc[1]} fluid/>
                    </Col>
                </Row>
                <Row>
                    <Image src={attributes.imgSrc[2]} fluid style={{width: '100%'}}/>
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
                            </ListGroup>
                        </Row>
                        <Row style={{paddingTop: '2vh'}}>
                            <h4>Description</h4>
                            <p>{attributes.description}</p>
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
                    <Link to={`/apmodel/${attributes.petId}`} style={{textDecoration: 'none'}}><h5>Recommended Pet</h5></Link>
                </Row>
                <Row>
                    <Col>
                        <Link to="/apmodel" style={{textDecoration: 'none'}}>Find an adoptable pet</Link>
                    </Col>
                    <Col>
                        <Link to="/acmodel" style={{textDecoration: 'none'}}>Find an adoption center with this breed</Link>
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
                  health: 'NA', description: 'NA', petId: '', imgSrv: []}
}
// Set type of the prop here.
SpeciesInstanceTemplate.propTypes = {
    attributes: PropTypes.object
}

export default SpeciesInstanceTemplate
