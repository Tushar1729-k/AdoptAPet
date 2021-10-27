import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import HomePage from "./HomePage"
import InstancePage from "../InstancePages/PetsInstanceTemplate"
import AdoptInstanceTemplate from '../InstancePages/AdoptInstanceTemplate'
import SpeciesInstanceTemplate from '../InstancePages/SpeciesInstanceTemplate'
import SpeciesModelPage from './SpeciesModelPage'
import PetsModelPage from './PetsModelPage'
import AdoptCentersPage from './AdoptCentersPage'
import AboutPage from "./AboutPage"
const MainSite = () => {

    const [petsData, setPetsData] = useState([])
    const [centersData, setCentersData] = useState([
        {
            api_id: 12,
            city: "Baltimore",
            email: "catrescueofmd@mindspring.com",
            id: 1,
            lat: 39.26750183105469,
            lon: -76.74459838867188,
            name: "Cat Rescue of Maryland, Inc.",
            pets: [],
            services: "",
            species_breed: [],
            state: "MD",
            zipcode: "21228"
        }
    ])
    const [breedsData, setBreedsData] = useState([
        {
            "adaptability": 5,
            "affection_level": 5,
            "alt_names": "",
            "api_id": 1,
            "breed_name": "Abyssinian",
            "centers": [
              {
                "api_id": 12,
                "id": 1,
                "name": "Cat Rescue of Maryland, Inc."
              },
              {
                "api_id": 13,
                "id": 2,
                "name": "Prince Georges Feral Friends, SPCA, Inc."
              },
              {
                "api_id": 16,
                "id": 3,
                "name": "Animal Relief Fund"
              },
              {
                "api_id": 22,
                "id": 4,
                "name": "LNF Dog Rescue Adoption Center"
              },
              {
                "api_id": 23,
                "id": 5,
                "name": "The Feline Foundation of Greater Washington, Inc."
              }
            ],
            "child_friendly": 3,
            "country_code": "EG",
            "dog_friendly": 4,
            "energy_level": 5,
            "grooming": 1,
            "hairless": 0,
            "health_issues": 2,
            "hypoallergenic": 0,
            "id": 1,
            "intelligence": 5,
            "life_span": "14 - 15",
            "natural": 1,
            "origin": "Egypt",
            "pets": [
              {
                "api_id": 11034,
                "id": 566,
                "name": "Sparkle"
              },
              {
                "api_id": 10035302,
                "id": 1384,
                "name": "Moja"
              }
            ],
            "shedding_level": 2,
            "short_legs": 0,
            "social_needs": 5,
            "species_id": 3,
            "species_name": "Cat",
            "stranger_friendly": 5,
            "suppressed_tail": 0,
            "temperament": "Active, Energetic, Independent, Intelligent, Gentle",
            "vocalization": 1,
            "weight": "7  -  10",
            "wikipedia_url": "https://en.wikipedia.org/wiki/Abyssinian_(cat)",
            "youth_name": "Kitten"
          }
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
        console.log(type, id)
        fetchData(type, id)
    }

    const selectedPage = (num) => {
        fetchData(num)
    }

    return (
        <div>
            <div style={{paddingBottom: '10vh'}}>
            <Navbar bg="primary" variant="dark" fixed="top">
                <Container>
                <Navbar.Brand href="/">Adopt A Pet</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/sbmodel">Species</Nav.Link>
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
                    <Route path="/dog">
                        <InstancePage 
                            attributes={{ breed: 'Siberian Husky', name: 'Peter', weight: '100', age: '3', color: 'white/black', sex: 'M'}}
                        />
                    </Route>
                    {petsData.map((pet, idx) => (
                        <Route key={idx} exact path={`/apmodel/${pet.api_id}`}>
                            <InstancePage 
                                attributes={{ breed: pet.species_breed.breed_name, name: pet.name, 
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
