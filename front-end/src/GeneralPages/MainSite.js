import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import HomePage from "./HomePage"
import InstancePage from "../InstancePages/InstancePageTemplate"
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
                        <SpeciesModelPage />
                    </Route>
                    <Route exact path="/apmodel">
                        <PetsModelPage />
                    </Route>
                    <Route exact path="/acmodel">
                        <AdoptCentersPage />
                    </Route>
                    <Route path="/dog">
                        <InstancePage 
                            attributes={{ breed: 'Siberian Husky', name: 'Peter', weight: '100', age: '3', color: 'white/black', sex: 'M'}}
                        />
                    </Route>
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <Route key={idx} exact path={`/apmodel/${pets[idx].animalID}`}>
                            <InstancePage 
                                attributes={{ breed: pets[idx].breed, name: pets[idx].name, size: pets[idx].size, 
                                              age: pets[idx].age, color: pets[idx].color, sex: pets[idx].sex,
                                              description: pets[idx].descriptionPlain, imgSrc: pets[idx].pictures[0].originalUrl,
                                              orgId: adoptionCenters[idx].orgID, sbId: idx + 1, mapSrc: maps[idx] }}
                                medicalHistory={{ allergies: pets[idx].allergies, diet: pets[idx].diet, 
                                                  issues: pets[idx].ongoingMedical, hearing: pets[idx].hearingImpaired,
                                                  sight: pets[idx].sightImpaired }}
                            />
                        </Route>
                    ))}
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <Route key={idx} exact path={`/acmodel/${adoptionCenters[idx].orgID}`}>
                            <AdoptInstanceTemplate
                                attributes={{ name: adoptionCenters[idx].name, address: adoptionCenters[idx].address,
                                              city: adoptionCenters[idx].city, state: adoptionCenters[idx].state, 
                                              zip: adoptionCenters[idx].zip, phone: adoptionCenters[idx].phone, 
                                              email: adoptionCenters[idx].email, type: adoptionCenters[idx].orgType, 
                                              site: adoptionCenters[idx].orgurl, species: adoptionCenters[idx].orgSpecies,
                                              services: adoptionCenters[idx].services, petId: pets[idx].animalID, sbId: idx + 1,
                                              imgSrc: centerImgs[idx],
                                              mapSrc: maps[idx]
                                            }}
                            />
                        </Route>
                    ))}
                    <Route exact path='/sbmodel/1'>
                        <SpeciesInstanceTemplate 
                            attributes={{ breed: 'Domestic Short Hair', species: 'Cat', weight: '11 - 15 pounds', height: 'NA', energy: 'NA',
                            color: 'White, black, blue, red, cream and silver, plus various patterns and shadings', lifespan: '15-20 years', 
                            temperament: `They are adaptable and good-natured, which makes them the ideal family companion.
                                          Although they loves attention from their people, including children, the Domestic
                                          Shorthair does not like being carried and is fairly independent. They may curl up
                                          in your lap on occasion, but they may prefer to sit alongside you instead. They'll
                                          get along fine with a cat-friendly dog, but their hunting instincts may take over with
                                          pet birds and other small animals.`,
                            shedding: `Domestic Shorthairs will shed but combing a couple times per week removes
                                          dead hair and redistributes skin oils to keep her coat shiny and prevent dry, itchy skin.`,
                            health: `The American Shorthair is a hearty and healthy breed. Some instances of hypertrophic cardiomyopathy
                                     have been recorded, but it’s unknown if the condition is hereditary. Their flat face also makes the
                                     breed more susceptible to ocular and respiratory issues. They are genetically predisposed to mouth
                                     and gum disease and their laid-back nature increases their risk of obesity. Reputable breeders test
                                     thoroughly to avoid breeding cats with genetic diseases`,
                            description: `As a working cat, American Shorthairs have a stocky, muscular build. Their muscular legs
                                     lend themselves to the American’s agility and endurance. They have a large head and full face, medium-sized
                                     ears and large, wide eyes.`,
                            petId: '17275209', imgSrc: [cat1, cat2, cat3], orgId: '198',
                            video: <iframe width="560" height="315" src="https://www.youtube.com/embed/WKZXNroTP1A" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>}}
                        />
                    </Route>
                    <Route exact path='/sbmodel/2'>
                        <SpeciesInstanceTemplate 
                            attributes={{ breed: 'Beagle', species: 'Dog', weight: '18 - 35 pounds', height: '13 - 15 inches', energy: 'Medium',
                            color: 'Tri-color (black, tan and white), and combinations of black, tan, red, white, brown, lemon, blue and redtick', lifespan: '10-15 years', 
                            temperament: `Beagles are affectionate, smart and energetic.`,
                            shedding: `The Beagle's smooth, dense double coat gets heavier during the winter and sheds in the summer. They also shed moderately throughout the year.`,
                            health: `Responsible breeders screen the Beagle breed for conditions like hip dysplasia, hypothyroidism, epilepsy, luxating patella and eye disorders.`,
                            description: `Beagles not only have an adorable face, but they are also generally loving and loveable, happy and companionable, making them great family dogs.
                            The Beagle is an intelligent pack dog who loves the company of other dogs and people. In fact, it was bred to work in packs, so they are happiest when they have company.
                            A Beagle left alone for too long may get restless and destructive.   
                            Although energetic, your Beagle's specific exercise needs will depend on their age and health. Over time, you'll get to know your dog and whether
                            they prefer lots of exercise or lounging on the couch. They are known escape artists, so watch them outside. When on walks, it's important to keep him on a leash, as his instincts are to run off and track if he catches a compelling scent.
                            As trackers, they love to follow their nose and chase balls or their favorite people. They also love to play, so teaching tricks and playing games are always hit with this breed.`,
                            petId: '17283929', imgSrc: [beagle1, beagle3, beagle2], orgId: '314',
                            video: <iframe width="560" height="315" src="https://www.youtube.com/embed/lWn-yOp8CxE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>}}
                        />
                    </Route>
                    <Route exact path='/sbmodel/3'>
                        <SpeciesInstanceTemplate 
                            attributes={{ breed: 'Pit Bull Terrier', species: 'Dog', weight: '50 - 70 pounds', height: '21 - 22 inches', energy: 'Medium',
                            color: 'Any color or all white', lifespan: '12-13 years', 
                            temperament: `The Bull Terrier is robust and spirited, and always ready for a frolic. He loves children, but obedience training is necessary, and care must be taken to avoid overstimulation around younger children. 
                            Friendly and affectionate, this energetic, well-muscled breed needs daily exercise.`,
                            shedding: `The Bull Terrier is a seasonal shedding breed. Giving his short, flat coat a weekly brushing will help to remove loose hair and dirt.`,
                            health: `While kidney and heart issues can be associated with the breed, responsible breeders test for these issues, and should test puppies for potential hearing issues.`,
                            description: `This robust Terrier group breed is muscular and big-boned, with a unique, egg-shaped head accentuated by pointed ears and small, mischievous eyes. Powerful and agile, they walk with a cheerful gait that showcases their outgoing personality. 
                            A happy Bull Terrier is one who receives early socialization with dogs and people, loving but firm training, lots of exercise and of course, time with his favorite people. A properly nurtured Bull Terrier is the most loving, loyal companion a family could want. `,
                            petId: '17275248', imgSrc: [terrier1, terrier2, terrier3], orgId: '356',
                            video: <iframe width="560" height="315" src="https://www.youtube.com/embed/X-yiP-bdD3k" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>}}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default MainSite
