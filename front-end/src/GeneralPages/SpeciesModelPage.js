import React from 'react'
import { Row, Table, Col, Button, Tabs, Tab } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { filterOptions, getFilterQueries } from './Filtering'
import Select from 'react-select'
import Highlighter from "react-highlight-words"
import Paginate from '../Components/Pagination'
import axios from 'axios'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const SpeciesModelPage = ({ fetchPage }) => {
    const [allBreeds, setAllBreeds] = useState([])
    const [numOfBreeds, setNumOfBreeds] = useState(368)
    const [filterQueries, setFilterQueries] = useState([])
    const [queryString, setQueryString] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [options, setOptions] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const fetchBreeds = async (query) => {
        setIsLoading(true)
        const res = await axios.get(`https://api.adoptapet.me/sb?${query}`)
        setAllBreeds(res.data.page)
        setIsLoading(false)
        setNumOfBreeds(res.data.count)
    }

    const fetchOptions = async () => {
        const weights = await axios.get(`https://api.adoptapet.me/sb?weights&page=-1`)
        const lifes = await axios.get(`https://api.adoptapet.me/sb?lifeexps&page=-1`)
        const origins = await axios.get(`https://api.adoptapet.me/sb?origins&page=-1`)
        let tempWeights = weights.data.page.map((el) => el.weight)
        tempWeights.sort()
        let tempLifes = lifes.data.page.map((el) => el.life_span)
        tempLifes.sort()
        let tempOrigins = origins.data.page.map((el) => el.origin)
        tempOrigins.sort()
        let weightOptions = filterOptions(tempWeights, "weight")
        let lifeOptions = filterOptions(tempLifes, "life_exp")
        let originOptions = filterOptions(tempOrigins, "origin")
        setOptions([weightOptions, lifeOptions, originOptions])
    }

    useEffect(() => {
        fetchBreeds(1)
        fetchOptions()
    }, [])

    const paginate = (num) => {
        setCurrentPage(num)
        if (queryString) {
            fetchBreeds(`page=${num}&${queryString}`)
        } else {
            fetchBreeds(`page=${num}`)
        }
    }
    const optionLabels = ['Weight', 'Life Expectancy', 'Origins']

    const fetchFilteredResults = (filter, option) => {
        let res = getFilterQueries(filter, option, filterQueries)
        setQueryString(res.query)
        setFilterQueries([...res.filters])
        if (res.query === "") {
            fetchBreeds(`page=${currentPage}`)
        } else {
            fetchBreeds(res.query)
        }

    }
    const fetchSearchResults = () => {
        fetchBreeds(`q=${searchQuery}`)
    }
    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            fetchSearchResults()
        }
    }
    return (
        <div style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
            <Row xs={1}>
                <Col>
                    <h2>Species</h2>
                    <h5>20 species, page {currentPage}/19</h5>
                    {isLoading && <h4>Loading...</h4>}
                </Col>
                <Col>
                    <Paginate totalItems={numOfBreeds} itemsPerPage={20} paginate={paginate} />
                </Col>
            </Row>
            <Row style={{ paddingBottom: '2vh' }}>
                <Tabs defaultActiveKey="sort" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="sort" title="Sort">
                        <Row style={{ color: '#00008b' }}>
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <Col key={idx}>
                                    <h6>{optionLabels[idx]}</h6>
                                    <Select options={options[idx]} isSearchable={true}
                                        onChange={(filter) => fetchFilteredResults(filter, options[idx][0].type)}
                                        isClearable={true}
                                    />
                                </Col>
                            ))}
                            <Col>
                                <h6>Species</h6>
                                <Select options={[{ value: 'species1', label: 'None', type: 'species' }, { value: 'species2', label: 'Cat', type: 'species' }, { value: 'species3', label: 'Dog', type: 'species' }]}
                                    isSearchable={true}
                                    isClearable={true}
                                    onChange={(option) => fetchFilteredResults(option, 'species')}
                                />
                            </Col>
                            <Col>
                                <h6>Sort Breeds(Asc.)</h6>
                                <Select options={[{ value: 'sort1', label: 'None', type: 'sort' }, { value: 'sort2', label: 'Breed', type: 'sort' }]}
                                    defaultValue="Name" isSearchable={true}
                                    isClearable={true}
                                    onChange={(filter) => fetchFilteredResults(filter, 'sort')}
                                />
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="search" title="Search">
                        <Row style={{ color: '#00008b' }}>
                            <h3>Breeds Search</h3>
                            <Col md={7} >
                                <div>
                                    <input type="text" onChange={e => setSearchQuery(e.target.value)} onKeyPress={handleKeyDown}
                                        placeholder="Enter query"
                                    />
                                </div>
                            </Col>
                            <Col md={5}>
                                <div style={{ paddingTop: '2vh' }}>
                                    <Button variant="primary" type="submit" onClick={() => fetchSearchResults()} style={{ backgroundColor: "#00008b" }}>
                                        Submit
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Row>
            <div style={{ paddingTop: '2vh' }}>
                <Table bordered hover size="md" responsive style={{ color: "#00008b" }}>
                    <thead>
                        <tr style={{ color: "white", backgroundColor: "#00008b" }}>
                            <th>Species</th>
                            <th>Breeds</th>
                            <th>Life Expectancy</th>
                            <th>Weight</th>
                            <th>Origin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBreeds.map((breed, index) => (
                            <tr key={index}>
                                <td>
                                    <Highlighter
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={breed.species_name}
                                    />
                                </td>
                                <Link to={`/sbmodel/${breed.api_id}`} style={{ color: "#00008b" }} onClick={() => fetchPage("sb", breed.api_id)}>
                                    <td>
                                        <Highlighter
                                            searchWords={[searchQuery]}
                                            autoEscape={true}
                                            textToHighlight={breed.breed_name}
                                        />
                                    </td>
                                </Link>
                                <td>
                                    <Highlighter
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={breed.life_span ? breed.life_span : "N/A"}
                                    />
                                </td>
                                <td>
                                    <Highlighter
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={breed.weight ? breed.weight : "N/A"}
                                    />
                                </td>
                                <td>
                                    <Highlighter
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={breed.origin ? breed.origin : "N/A"}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

// Set type of the prop here.
SpeciesModelPage.propTypes = {
    fetchPage: PropTypes.func
}

export default SpeciesModelPage
