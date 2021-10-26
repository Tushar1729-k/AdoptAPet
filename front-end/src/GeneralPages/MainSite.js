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
import pets from '../Data/AnimalsData.json'
import AboutPage from "./AboutPage"
import adoptionCenters from '../Data/AdoptionCenters.json'
import cat1 from '../Images/domestic_short_hair_1.jpeg'
import cat2 from '../Images/domestic_short_hair_2.jpeg'
import cat3 from '../Images/domestic_short_hair_3.jpeg'
import beagle1 from '../Images/beagle_1.jpeg'
import beagle2 from '../Images/beagle_2.webp'
import beagle3 from '../Images/beagle_3.jpeg'
import terrier1 from '../Images/pitbull_terrier_1.jpeg'
import terrier2 from '../Images/pitbull_terrier_3.jpeg'
import terrier3 from '../Images/pitbull_terrier_2.jpeg'
import map1 from '../Images/198_map.png'
import map2 from '../Images/314_map.png'
import map3 from '../Images/356_map.png'
import centerImg1 from '../Images/adop_1.png'
import centerImg2 from '../Images/adop_2.png'
import centerImg3 from '../Images/adop_3.png'

const MainSite = () => {
    const maps = [map1,map2,map3]
    const centerImgs = [centerImg2, centerImg1, centerImg3]

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
    const [breedsData, setBreedsData] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const petRes = await axios.get(`https://api.adoptapet.me/ap?page=-1`)
    //         const centerRes = await axios.get(`https://api.adoptapet.me/ac?page=-1`)
    //         const breedRes = await axios.get(`https://api.adoptapet.me/sb?page=-1`)
    //         setPetsData(petRes.data.page)
    //         console.log("pets data", petsData)
    //         setCentersData(centerRes.data.page)
    //         console.log("center data", centersData)
    //         setBreedsData(breedRes.data.page)
    //         console.log("breeds data", breedsData)
    //     }
    //     fetchData(1)
    // }, [])

    const fetchData = async (type, id) => {
        const res = await axios.get(`https://api.adoptapet.me/${type}/${id}`)
        if (type === "ap") {
            setPetsData([res.data])
        } else if (type === "ac") {
            setCentersData([res.data])
        } else {
            setBreedsData([res.data])
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
                            description: `As a working cat, American Shorthairs have a stocky, muscular build. Their muscular legs
                                     lend themselves to the American’s agility and endurance. They have a large head and full face, medium-sized
                                     ears and large, wide eyes.`,
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
