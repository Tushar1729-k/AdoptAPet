import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import HomePage from "./HomePage"
import InstancePage from "../InstancePages/InstancePageTemplate"
import SpeciesModelPage from './SpeciesModelPage'
import PetsModelPage from './PetsModelPage'
import AdopCentersPage from './AdopCentersPage'
import pets from '../Data/AnimalsData.json'

const MainSite = () => {
    return (
        <div>
            <div style={{paddingBottom: '10vh'}}>
            <Navbar bg="primary" variant="dark" fixed="top">
                <Container>
                <Navbar.Brand href="/">Adopt A Pet</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/apmodel">Pets</Nav.Link>
                <Nav.Link href="/acmodel">Adoption Centers</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            </div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/sbmodel">
                        <SpeciesModelPage />
                    </Route>
                    <Route exact path="/apmodel">
                        <PetsModelPage />
                    </Route>
                    <Route exact path="/acmodel">
                        <AdopCentersPage />
                    </Route>
                    <Route path="/dog">
                        <InstancePage 
                            attributes={{ breed: 'Siberian Husky', name: 'Peter', weight: '100', age: '3', color: 'white/black', sex: 'M'}}
                        />
                    </Route>
                    {pets.map((pet, index) =>
                        <Route key={index} exact path={`/apmodel/${pet.animalID}`}>
                            <InstancePage 
                                attributes={{ breed: pet.breed, name: pet.name, size: pet.size, 
                                              age: pet.age, color: pet.color, sex: pet.sex,
                                              description: pet.descriptionPlain, imgSrc: pet.pictures[0].originalUrl }}
                            />
                        </Route>
                    )}
                </Switch>
            </Router>
        </div>
    )
}

export default MainSite
