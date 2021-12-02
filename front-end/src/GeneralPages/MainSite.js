import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { FaDog, FaHome, FaInfoCircle, FaPaw, FaCat, FaCartPlus, FaSearch, FaChartPie } from "react-icons/fa"
import HomePage from "./HomePage"
import InstancePage from "../InstancePages/PetsInstanceTemplate"
import AdoptInstanceTemplate from '../InstancePages/AdoptInstanceTemplate'
import SpeciesInstanceTemplate from '../InstancePages/SpeciesInstanceTemplate'
import SpeciesModelPage from './SpeciesModelPage'
import PetsModelPage from './PetsModelPage'
import AdoptCentersPage from './AdoptCentersPage'
import VizPage from './VizPage'
import AboutPage from "./AboutPage"
import SearchResultsPage from './SearchResultsPage'

const MainSite = () => {
    const [petsData, setPetsData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [centersData, setCentersData] = useState([
    ])
    const [breedsData, setBreedsData] = useState([
    ])

    const fetchData = async (type, id) => {
        const res = await axios.get(`https://api.adoptapet.me/${type}/${id}`)
        if (type === "ap") {
            setPetsData([res.data])
            localStorage.setItem('petsData', res.data)
        } else if (type === "ac") {
            setCentersData([res.data])
            localStorage.setItem('centersData', res.data)
        } else {
            setBreedsData([res.data])
            localStorage.setItem('breedsData', res.data)
        }
    }

    const fetchPage = (type, id) => {
        id = id.toString()
        fetchData(type, id)
    }

    useEffect(() => {
        const localPetsData = localStorage.getItem('petsData')
        const localCD = localStorage.getItem('centersData')
        const localBD = localStorage.getItem('breedsData')

        if (localPetsData) {
            setPetsData([localPetsData])
        }
        if (localCD) {
            setCentersData([localCD])
        }
        if (localBD) {
            setBreedsData([localBD])
        }
        if (performance.getEntriesByType("navigation")) {
            fetchData
          } else {
            console.log("This page is not reloaded");
          }
      }, [])
    return (
        <div>
            <div style={{paddingBottom: '7vh'}}>
            <Navbar variant="dark" fixed="top" style={{backgroundColor: "#00008b"}}>
                <Container>
                <Navbar.Brand href="/">
                    <Row>
                        <Col>
                            <FaDog/> 
                        </Col>
                        {/* Website title */}
                        <Col>
                            Adopt A Pet
                        </Col>
                    </Row>
                {/* These are links in the nav bar that take you to the different pages */}
                </Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/"><FaHome/> Home</Nav.Link>
                <Nav.Link href="/about"><FaInfoCircle/> About</Nav.Link>
                <Nav.Link href="/sbmodel"><FaCat/> Species</Nav.Link>
                <Nav.Link href="/apmodel"><FaPaw/> Pets</Nav.Link>
                <Nav.Link href="/acmodel"><FaCartPlus/> Adoption Centers</Nav.Link>
                <Nav.Link href="/visualizations"><FaChartPie/> Visualizations</Nav.Link>
                <Nav.Link href="/search">
                    <FaSearch />Search
                </Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            </div>
            {/* Main router that contains all the routes to the different pages. */}
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/about">
                        <AboutPage />
                    </Route>
                    <Route exact path="/sbmodel">
                        <SpeciesModelPage fetchPage={fetchPage} />
                    </Route>
                    <Route exact path="/apmodel">
                        <PetsModelPage fetchPage={fetchPage}/>
                    </Route>
                    <Route exact path="/acmodel">
                        <AdoptCentersPage fetchPage={fetchPage}/>
                    </Route>
                    <Route exact path="/visualizations">
                        <VizPage fetchPage={fetchPage}/>
                    </Route>
                    <Route exact path="/search">
                        <SearchResultsPage searchQuery={searchQuery} fetchPage={fetchPage} />
                    </Route>
                    {/* The next three routes are for the three different kinds of instance pages
                        for our three model are rendered dynamically depending on what the user chooses
                        in the model pages, or in the links provided in each instance page */}
                    {/* This is done for efficiency purposes as otherwise pulling all the data at
                        once for all instance pages will be incredibly slow and might overload react. */}
                    {petsData.map((pet, idx) => (
                        <Route key={idx} exact path={`/apmodel/${pet.api_id}`}>
                            <InstancePage 
                                attributes={{ breed: "Breed", name: pet.name, 
                                              age: pet.age, color: pet.color, sex: pet.sex,
                                              description: pet.desc, imgSrc: pet.pic_url,
                                              adoptCenter: pet.center, speciesBreeds: pet.species_breed }}
                                medicalHistory={{ allergies: pet.allergies, diet: pet.diet, 
                                                  issues: pet.ongoingMedical, hearing: pet.hearingImpaired,
                                                  sight: pet.sightImpaired }}
                                fetchPage={fetchPage}
                            />
                        </Route>
                    ))}
                    {centersData.map((center, idx) => (
                        <Route key={idx} exact path={`/acmodel/${center.api_id}`}>
                            <AdoptInstanceTemplate
                                attributes={{ name: center.name, address: center.street,
                                              city: center.city, state: center.state, 
                                              zip: center.zipcode, phone: center.phone, 
                                              email: center.email, type: center.orgType, 
                                              site: center.orgurl, species: center.orgSpecies,
                                              services: center.services, speciesBreeds: center.species_breed,
                                              pets: center.pets, lat: center.lat, lon: center.lon
                                            }}
                                fetchPage={fetchPage}
                            />
                        </Route>
                    ))}
                    {breedsData.map((breed, idx) => (
                        <Route key={idx} exact path={`/sbmodel/${breed.api_id}`}>
                            <SpeciesInstanceTemplate 
                            attributes={{ breed: breed.breed_name, species: breed.species_name, weight: breed.weight, height: 'NA', energy: breed.energy_level,
                            color: 'White, black, blue, red, cream and silver, plus various patterns and shadings', lifespan: breed.life_span, 
                            temperament: breed.temperament,
                            shedding: breed.shedding_level,
                            health: breed.health_issues,
                            origin: breed.origin,
                            adoptCenters: breed.centers, pets: breed.pets, wiki: breed.wikipedia_url}}
                            fetchPage={fetchPage}
                        />
                        </Route>
                    ))}
                </Switch>
                </Router>
        </div>
    )
}

export default MainSite
