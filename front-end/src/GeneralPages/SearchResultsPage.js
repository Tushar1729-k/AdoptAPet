import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import Highlighter from "react-highlight-words"
import PetsSearch from "../Data/PetsSearch.json"
import CentersSearch from "../Data/CentersSearch.json"
import BreedsSearch from "../Data/BreedsSearch.json"
import axios from 'axios'

const SearchResultsPage = ({ fetchPage }) => {

    const [searchResults, setSearchResults] = useState({ pets: PetsSearch, breeds: BreedsSearch, centers: CentersSearch })
    const [searchQuery, setSearchQuery] = useState("")
    const fetchSearchResults = async () => {
        setIsLoading(true)
        const res = await axios.get(`https://api.adoptapet.me/search?q=${searchQuery}`)
        setIsLoading(false)
        setSearchResults(res.data)
    }
    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            fetchSearchResults()
        }
    }
    // General search page that returns results for all model pages.
    /* Search functionality works the same as in the model pages, except now results for all
       model pages are shown for a given query. */
    const [isLoading, setIsLoading] = useState(false)
    return (
        <div style={{ padding: '4vw' }}>
            <Row style={{ color: '#00008b' }}>
                <h1>Results for: {searchQuery}</h1>
                {isLoading && <h4>Loading...</h4>}
                <Col md={7}>
                    <div>
                        <input type="text" onChange={e => setSearchQuery(e.target.value)} onKeyPress={handleKeyDown}
                            placeholder="Enter query"
                        />
                    </div>
                </Col>
                <Col md={5}>
                    <div style={{ paddingTop: '2vh' }}>
                        <Button style={{ backgroundColor: '#00008b' }} variant="primary" type="submit" onClick={() => fetchSearchResults()}>
                            Submit
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row style={{ paddingTop: '4vh' }}>
                <h2>Breeds Results</h2>
            </Row>
            <Row xs={1} md={4} className="g-4" style={{ paddingTop: "2vh" }}>
                {searchResults.breeds.map((breed, index) => (
                    <Link to={`/sbmodel/${breed.api_id}`} style={{ textDecoration: 'none' }} onClick={() => fetchPage("sb", breed.api_id)} key={index}>
                        <Col>
                            <Card>
                                <Card.Body style={{ backgroundColor: "white", color: "#00008b" }}>
                                    <Card.Title style={{ fontSize: '4vh' }}>
                                        <Highlighter
                                            searchWords={[searchQuery]}
                                            autoEscape={true}
                                            textToHighlight={breed.species_name}
                                        />
                                    </Card.Title>
                                    <Card.Subtitle style={{ fontSize: '2vh' }} className="mb-2 text-muted">
                                        <Highlighter
                                            searchWords={[searchQuery]}
                                            autoEscape={true}
                                            textToHighlight={breed.breed_name}
                                        />
                                    </Card.Subtitle>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Highlighter
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={`Life span: ${breed.life_span ? breed.life_span : "N/A"}`}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Highlighter
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={`Weight: ${breed.weight ? breed.weight : "N/A"}`}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Highlighter
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={`Origin: ${breed.origin ? breed.origin : "N/A"}`}
                                            />
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>
                ))}
            </Row>
            <Row style={{ paddingTop: '4vh' }}>
                <h2>Adoption Centers Results</h2>
            </Row>
            <Row xs={1} md={2} className="g-4" style={{ paddingTop: "2vh" }}>
                {searchResults.centers.map((center, index) => (
                    <Link to={`/acmodel/${center.api_id}`} style={{ textDecoration: 'none' }} onClick={() => fetchPage("ac", center.api_id)} key={index}>
                        <Col>
                            <Card >
                                <Card.Body style={{ backgroundColor: "white", color: "#00008b" }}>
                                    <Card.Title style={{ fontSize: '4vh' }}>
                                        <Highlighter
                                            searchWords={[searchQuery]}
                                            autoEscape={true}
                                            textToHighlight={center.name}
                                        />
                                    </Card.Title>
                                    <Card.Subtitle style={{ fontSize: '2vh' }} className="mb-2 text-muted">
                                        <Highlighter
                                            searchWords={[searchQuery]}
                                            autoEscape={true}
                                            textToHighlight={`${center.city}`}
                                        />
                                    </Card.Subtitle>
                                    <ListGroup horizontal>
                                        <ListGroup.Item>
                                            <Highlighter
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={`State: ${center.state}`}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Highlighter
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={`Zip: ${center.zipcode}`}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Highlighter
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={`Type: ${center.type}`}
                                            />
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>
                ))}
            </Row>
            <Row style={{ paddingTop: '4vh' }}>
                <h2>Pets Results</h2>
            </Row>
            <Row xs={1} md={4} className="g-4" style={{ paddingTop: "2vh" }}>
                {searchResults.pets.map((pet, idx) => (
                    <Link key={idx} to={`/apmodel/${pet.api_id}`} style={{ textDecoration: 'none' }} onClick={() => fetchPage("ap", pet.api_id)}>
                        <Col>
                            <Card>
                                <img variant="top" src={pet.pic_url} style={{ width: '100%', height: '400px' }} />
                                <Card.Body style={{ backgroundColor: "#00008b", color: "white" }}>
                                    <Card.Title style={{ fontSize: '4vh' }}>
                                        <Highlighter
                                            searchWords={[searchQuery]}
                                            autoEscape={true}
                                            textToHighlight={`${pet.name} (${pet.sex})`}
                                        />
                                    </Card.Title>
                                    <Card.Subtitle style={{ fontSize: '2vh' }} className="mb-2 text-muted">
                                        <Highlighter
                                            searchWords={[searchQuery]}
                                            autoEscape={true}
                                            textToHighlight={pet.species_breed.breed_name}
                                        />
                                    </Card.Subtitle>
                                    <ListGroup horizontal>
                                        <ListGroup.Item>
                                            <Highlighter
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={`Size : ${pet.size_group}`}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Highlighter
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={`Age : ${pet.age}`}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Highlighter
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={`Color : ${pet.color}`}
                                            />
                                        </ListGroup.Item>
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

SearchResultsPage.defaultProps = {
    searchQuery: ""
}
// Set type of the prop here.
SearchResultsPage.propTypes = {
    searchQuery: PropTypes.string,
    fetchPage: PropTypes.func
}

export default SearchResultsPage
