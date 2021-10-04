import React from 'react'
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const AdoptInstanceTemplate = ({attributes}) => {
    return (
        <div>
            <div style={{paddingLeft: "20vw", paddingRight: "20vw"}}>
                {/* <Row>
                    <Image src={attributes.imgSrc} fluid style={{width: '100%', height: '750px'}}/>
                </Row> */}
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
                <Row>
                    <Col>
                        <Link to="/sbmodel" style={{textDecoration: 'none'}}>Look through species and breeds</Link>
                    </Col>
                    <Col>
                        <Link to="/apmodel" style={{textDecoration: 'none'}}>Find an adoptable pet</Link>
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
                  services: ''}
}
// Set type of the prop here.
AdoptInstanceTemplate.propTypes = {
    attributes: PropTypes.object
}

export default AdoptInstanceTemplate
