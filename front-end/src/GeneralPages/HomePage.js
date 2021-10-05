import React from 'react'
import { Card, Row, Col, CardGroup } from 'react-bootstrap'
import DogHomePage from "../Images/dog_home_page.jpg"
import SpeciesBreedHomePage from "../Images/species_breeds_home.jpg"
import AdoptableHomePage from "../Images/adoptable_model_home.jpg"
import AdoptionCenterHomePage from "../Images/adoption_center_model_home.jpg"
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div style={{paddingLeft: "5vw", paddingRight: "5vw"}}>
            <div>
            <Card>
                <Card.Body>
                <Card.Text>
                    <Row>
                        <Col></Col>
                        <Col lg={6} xl={6}>
                            <h1>Give a home to these animals</h1>
                        </Col>
                        <Col></Col>
                    </Row>
                </Card.Text>
                </Card.Body>
                <Card.Img variant="bottom" src={DogHomePage} />
            </Card>
            </div>
            <div style={{paddingTop: "4vh"}}>
            <CardGroup>
                <Card>
                    <Link to="/sbmodel" style={{ textDecoration: 'none'}}>
                        <Card.Img variant="top" src={SpeciesBreedHomePage} />
                        <Card.Body>
                        <Card.Title><h2>Species</h2></Card.Title>
                        <Card.Text>
                            Look through different species of pets
                        </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
                <Card>
                    <Link to="/apmodel" style={{ textDecoration: 'none'}}>
                        <Card.Img variant="top" src={AdoptableHomePage} />
                        <Card.Body>
                        <Card.Title><h2>Adoptable Pets</h2></Card.Title>
                        <Card.Text>
                            Find out which pets are adoptable
                        </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
                <Card>
                    <Link to="acmodel" style={{ textDecoration: 'none'}}>
                        <Card.Img variant="top" src={AdoptionCenterHomePage} />
                        <Card.Body>
                        <Card.Title><h2>Adoption Centers</h2></Card.Title>
                        <Card.Text>
                            Find an adoption center to give a home
                        </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
                </CardGroup>
            </div>

        </div>
    )
}

export default HomePage
