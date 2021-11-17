import React from 'react'
import { Row, Table, Col, Button, Tabs, Tab, Form } from 'react-bootstrap'
import {  useState, useEffect } from 'react'
import Select from 'react-select'
import Highlighter from "react-highlight-words"
import Paginate from '../Components/Pagination'
import axios from 'axios'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const SpeciesModelPage = ({fetchPage}) => {
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

    const filterOptions = (arr, val) => {
        let temp = [...new Set(arr)]
        temp = temp.map((el) => {
            return {value: `${val}${el}`, label: el, type: val}
        })
        temp.unshift({value: val, label: "None", type: val})
        return temp
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
    const checkfilterQueries = (filter) => {
        for (let i = 0; i < filterQueries.length; i++) {
            if (filter.type === filterQueries[i].type) {
                let newQueries = [...filterQueries];
                newQueries.splice(i, 1)
                setFilterQueries([...newQueries, filter])
                return [...newQueries, filter]
            }
        }
        setFilterQueries([...filterQueries, filter])
        return [...filterQueries, filter]
    }
    const getQueryString = (queries) => {
        let tempQueryString = ""
        for (let i = 0; i < queries.length; i++) {
            if (queries.length != 1 && i + 1 != queries.length) {
                tempQueryString = tempQueryString.concat(queries[i].type.concat("=", queries[i].label), "&")
            } else {
                tempQueryString = tempQueryString.concat(queries[i].type.concat("=", queries[i].label))
            }
        }
        tempQueryString = tempQueryString.toLowerCase()
        return tempQueryString
    }
    const fetchFilteredResults = (filter, option) => {
        if (filter && filter.label !== "None") {
            let tempFilterQueries = checkfilterQueries(filter)
            let tempQueryString = getQueryString(tempFilterQueries)
            setQueryString(tempQueryString)
            fetchBreeds(tempQueryString)
        } else {
            let newQueries = []
            for (let i = 0; i < filterQueries.length; i++) {
                if (option === filterQueries[i].type) {
                    newQueries = [...filterQueries];
                    newQueries.splice(i, 1)
                    setFilterQueries([...newQueries])
                }
            }
            if (newQueries.length != 0) {
                let tempQueryString = getQueryString(newQueries)
                setQueryString(tempQueryString)
                fetchBreeds(tempQueryString)
            } else {
                setQueryString("")
                fetchBreeds(`page=${currentPage}`)
            }
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
        <div style={{paddingLeft: '10vw', paddingRight: '10vw'}}>
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
            <Row style={{paddingBottom: '2vh'}}>
            <Tabs defaultActiveKey="sort" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="sort" title="Sort">
                    <Row>
                        {Array.from({length: 3}).map((_, idx) => (
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
                        <Select options={[{value: 'species1', label: 'None', type: 'species'}, {value: 'species2', label: 'Cat', type: 'species'}, {value: 'species3', label: 'Dog', type: 'species'}]} 
                            isSearchable={true}
                            isClearable={true}
                            onChange={(option) => fetchFilteredResults(option, 'species')}
                        />
                    </Col>
                    <Col>
                        <h6>Sort Breeds(Asc.)</h6>
                        <Select options={[{value: 'sort1', label: 'None', type: 'sort'}, {value: 'sort2', label: 'Breed', type: 'sort'}]} 
                            defaultValue="Name" isSearchable={true}
                            isClearable={true}
                            onChange={(filter) => fetchFilteredResults(filter, 'sort')}
                        />
                    </Col>
                    </Row>
                </Tab>
                <Tab eventKey="search" title="Search">
                <div style={{width: "50vw"}}>
                        <h3>Breeds Search</h3>
                        <input type="text" onChange={e => setSearchQuery(e.target.value)} onKeyPress={handleKeyDown} 
                            placeholder="Enter query"
                        />
                    </div>
                    <div style={{paddingTop: '2vh'}}>
                        <Button variant="primary" type="submit" onClick={() => fetchSearchResults()}>
                            Submit
                        </Button>
                    </div>
                </Tab>
            </Tabs>
            </Row>
            <div style={{ paddingTop: '2vh'}}>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
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
                    <Link to={`/sbmodel/${breed.api_id}`} style={{ textDecoration: 'none'}} onClick={() => fetchPage("sb", breed.api_id)}>
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
