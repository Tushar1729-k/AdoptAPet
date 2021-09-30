import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./HomePage"
import InstancePage from "../InstancePages/InstancePageTemplate"

const MainSite = () => {
    return (
        <div>
            <Navbar bg="primary" variant="dark" fixed="top">
                <Container>
                <Navbar.Brand href="/">Adopt A Pet</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#pets">Pets</Nav.Link>
                <Nav.Link href="#centers">Adoption Centers</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/dog">
                        <InstancePage 
                            attributes={{ breed: 'Siberian Husky', name: 'Peter', weight: '100', age: '3', color: 'white/black', sex: 'M'}}
                        />
                    </Route>
                    <Route path="/dog1">
                        <InstancePage 
                            attributes={{ breed: 'Pitbull', name: 'Angry', weight: '50 lbs', age: '5', color: 'grey', sex: 'F'}}
                        />
                    </Route>
                    <Route path="/dog2">
                        <InstancePage 
                            attributes={{ breed: 'Retriever', name: 'Hulk', weight: '90 lbs', age: '5', color: 'golden', sex: 'M'}}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default MainSite
