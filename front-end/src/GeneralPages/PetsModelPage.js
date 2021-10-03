import React from 'react'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"
import pets from '../Data/AnimalsData.json'

const PetsModelPage = () => {
    return (
        <div style={{padding: '4vw'}}>
            <Row xs={1} md={2} className="g-4">
                {Array.from({ length: 100 }).map((_, idx) => (
                    <Link key={idx} to={`/apmodel/${pets[idx].animalID}`} style={{ textDecoration: 'none'}}>
                        <Col>
                        <Card>
                            <Card.Img variant="top" src={pets[idx].pictures[0].originalUrl} style={{width: '100%', height: '400px'}} />
                            <Card.Body>
                            <Card.Title style={{fontSize: '4vh'}}>{pets[idx].name}</Card.Title>
                            <Card.Subtitle style={{fontSize: '2vh'}} className="mb-2 text-muted">{pets[idx].breed}</Card.Subtitle>
                            <ListGroup horizontal>
                            <ListGroup.Item>Sex : {pets[idx].sex}</ListGroup.Item>
                            <ListGroup.Item>Age : {pets[idx].age != "" ? pets[idx].age : "Not Available"}</ListGroup.Item>
                            <ListGroup.Item>Color : {pets[idx].color != "" ? pets[idx].color : "Exact Color NA"}</ListGroup.Item>
                            </ListGroup>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Link>
                ))}
            </Row>
        </div>
    )
}

export default PetsModelPage
