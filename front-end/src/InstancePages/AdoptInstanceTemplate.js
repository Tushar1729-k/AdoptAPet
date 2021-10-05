import React from 'react'
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const AdoptInstanceTemplate = ({attributes}) => {
    return (
        <div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw"}}>
                <Row>
                    <Image src={attributes.imgSrc} fluid style={{width: '100%'}}/>
                </Row>
                <Row>
                    <h4>Google Maps</h4>
                    <Image src={attributes.mapSrc} fluid style={{width: '100%'}}/>
                </Row>
            </div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw", paddingTop: "4vh"}}>
            <Card style={{ width: '60vw' }}>
            <Card.Body>
                <Card.Img src={'../rescuemeinc.png'}  />
                <Card.Title style={{fontSize: '6vh'}}>{attributes.name}</Card.Title>
                <Card.Subtitle style={{fontSize: '4vh'}} className="mb-2 text-muted">{attributes.type}</Card.Subtitle>
                <Card.Text>
                    <Container>
                        <Row>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Species Available : {attributes.species}</ListGroup.Item>
                                <ListGroup.Item>Services Available : {attributes.services}</ListGroup.Item>
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
                        <Link to={`/apmodel/${attributes.petId}`} style={{textDecoration: 'none'}}><h5>Look at an available pet</h5></Link>
                    </Col>
                    <Col>
                        <Link to={`/sbmodel/${attributes.sbId}`} style={{textDecoration: 'none'}}><h5>See one of our common breeds</h5></Link>
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
                  services: '', petId: '', sbId: '', mapSrc: '', imgSrc: ''}
}
// Set type of the prop here.
AdoptInstanceTemplate.propTypes = {
    attributes: PropTypes.object
}

export default AdoptInstanceTemplate
