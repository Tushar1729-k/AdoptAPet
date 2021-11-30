import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import SpeciesBreedHomePage from "../Images/species_breeds_home.jpg"
import AdoptableHomePage from "../Images/adoptable_model_home.jpg"
import AdoptionCenterHomePage from "../Images/adoption_center_model_home.jpg"
import CarouselHomePage from '../Components/CarouselHomePage'
import { Link } from "react-router-dom";
import { Parallax } from 'react-parallax'
import beagle_3 from '../Images/beagle_3.jpg'
import pitbull_terrier_3 from '../Images/pitbull_terrier_3.jpg'
import sib_husky_1 from '../Images/sib_husky_1.jpg'

const HomePage = () => {
    return (
        <div>
            <CarouselHomePage />
            <Parallax blur={1} bgImage={beagle_3} bgImageAlt="the cat" strength={300}>
                <div style={{ height: '90vh'}}>
                </div>
            </Parallax>
            <Parallax blur={1} bgImage={pitbull_terrier_3} bgImageAlt="the cat" strength={300}>
                <div style={{ height: '100vh'}}>
                </div>
            </Parallax>
            <Parallax blur={1} bgImage={sib_husky_1} bgImageAlt="the cat" strength={300}>
                <div style={{ height: '90vh'}}>
                </div>
            </Parallax>
            <div style={{ paddingTop: "4vh", paddingLeft: "4vw", paddingRight: "4vw" }}>
                <CardGroup>
                    <Card>
                        <Link to="/sbmodel" style={{ textDecoration: 'none' }}>
                            <Card.Img variant="top" src={SpeciesBreedHomePage} />
                            <Card.Body style={{ backgroundColor: "#00008b", color: "white" }}>
                                <Card.Title><h2>Species</h2></Card.Title>
                                <Card.Text>
                                    Look through different species of pets
                                </Card.Text>
                            </Card.Body>
                        </Link>
                    </Card>
                    <Card>
                        <Link to="/apmodel" style={{ textDecoration: 'none' }}>
                            <Card.Img variant="top" src={AdoptableHomePage} />
                            <Card.Body style={{ backgroundColor: "#00008b", color: "white" }}>
                                <Card.Title><h2>Adoptable Pets</h2></Card.Title>
                                <Card.Text>
                                    Find out which pets are adoptable
                                </Card.Text>
                            </Card.Body>
                        </Link>
                    </Card>
                    <Card>
                        <Link to="acmodel" style={{ textDecoration: 'none' }}>
                            <Card.Img variant="top" src={AdoptionCenterHomePage} />
                            <Card.Body style={{ backgroundColor: "#00008b", color: "white" }}>
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
