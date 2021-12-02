import React from 'react'
import { Row, Table, Col, Button, Tabs, Tab } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { filterOptions, getFilterQueries } from '../Components/Filtering'
import Highlighter from "react-highlight-words"
import Select from 'react-select'
import Paginate from '../Components/Pagination'
import axios from 'axios'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const AdoptCentersPage = ({ fetchPage }) => {
    const [allCenters, setAllCenters] = useState([])
    const [filterQueries, setFilterQueries] = useState([])
    const [queryString, setQueryString] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const fetchCenters = async (query) => {
        setIsLoading(true)
        const res = await axios.get(`https://api.adoptapet.me/ac?${query}`)
        setAllCenters(res.data.page)
        setIsLoading(false)
    }

    const fetchOptions = async () => {
        const states = await axios.get(`https://api.adoptapet.me/ac?states&page=-1`)
        const cities = await axios.get(`https://api.adoptapet.me/ac?cities&page=-1`)
        const zips = await axios.get(`https://api.adoptapet.me/ac?zips&page=-1`)
        let tempStates = states.data.page.map((el) => el.state)
        tempStates.sort()
        let tempCities = cities.data.page.map((el) => el.city)
        tempCities.sort()
        let tempZips = zips.data.page.map((el) => el.zipcode)
        tempZips.sort()
        let stateOptions = filterOptions(tempStates, "state")
        console.log("state", stateOptions)
        let cityOptions = filterOptions(tempCities, "city")
        console.log("city", cityOptions)
        let zipsOptions = filterOptions(tempZips, "zip")
        setOptions([cityOptions, stateOptions, zipsOptions])
    }

    useEffect(() => {
        fetchCenters(1)
        fetchOptions()
    }, [])
    const paginate = (num) => {
        setCurrentPage(num)
        if (queryString) {
            fetchCenters(`page=${num}&${queryString}`)
        } else {
            fetchCenters(`page=${num}`)
        }
    }
    const whichCenterPage = (type, num) => {
        fetchPage(type, num)
    }
    const optionLabels = ['City', 'State', 'Zipcode']
    const fetchFilteredResults = (filter, option) => {
        let res = getFilterQueries(filter, option, filterQueries)
        setQueryString(res.query)
        setFilterQueries([...res.filters])
        if (res.query === "") {
            fetchCenters(`page=${currentPage}`)
        } else {
            fetchCenters(res.query)
        }
    }
    const fetchSearchResults = () => {
        fetchCenters(`q=${searchQuery}`)
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
                    <h2>Adoption Centers</h2>
                    <h6>20 adoption centers, page {currentPage}/5</h6>
                    {isLoading && <h4>Loading...</h4>}
                </Col>
                <Col>
                    <Paginate totalItems={100} itemsPerPage={20} paginate={paginate} />
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
                                <h6 >Center Type</h6>
                                <Select options={[{ value: 'type1', label: 'None', type: 'type' }, { value: 'type2', label: 'Rescue', type: 'type' }, { value: 'type3', label: 'Shelter', type: 'type' }]}
                                    isSearchable={true}
                                    isClearable={true}
                                    onChange={(option) => fetchFilteredResults(option, 'type')}
                                />
                            </Col>
                            <Col>
                                <h6>Sort Name(Asc.)</h6>
                                <Select options={[{ value: 'sort1', label: 'None', type: 'sort' }, { value: 'sort2', label: 'Name', type: 'sort' }]}
                                    isSearchable={true}
                                    isClearable={true}
                                    onChange={(filter) => fetchFilteredResults(filter, 'sort')}
                                />
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="search" title="Search">
                        <Row style={{ color: '#00008b' }}>
                            <h3>Adoption Center Search</h3>
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
                    </Tab>
                </Tabs>
            </Row>
            <div style={{ paddingTop: '2vh' }}>
                <Table bordered hover size="md" responsive style={{ color: "#00008b" }}>
                    <thead>
                        <tr style={{ color: "white", backgroundColor: "#00008b" }}>
                            <th>Name</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Center Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allCenters.map((center, index) => (
                            <tr key={index}>
                                <Link to={`/acmodel/${center.api_id}`} style={{ color: '#00008b' }} onClick={() => whichCenterPage("ac", center.api_id)}>
                                    <td>
                                        <Highlighter
                                            searchWords={[searchQuery]}
                                            autoEscape={true}
                                            textToHighlight={center.name}
                                        />
                                    </td>
                                </Link>
                                <td>
                                    <Highlighter
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={center.city}
                                    />
                                </td>
                                <td>
                                    <Highlighter
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={center.state}
                                    />
                                </td>
                                <td>
                                    <Highlighter
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={center.zipcode}
                                    />
                                </td>
                                <td>
                                    <Highlighter
                                        searchWords={[searchQuery]}
                                        autoEscape={true}
                                        textToHighlight={center.type}
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

AdoptCentersPage.propTypes = {
    fetchPage: PropTypes.func
}

export default AdoptCentersPage
