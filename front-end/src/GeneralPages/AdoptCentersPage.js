import React from 'react'
import { Row, Table, Col } from 'react-bootstrap'
import {  useState, useEffect } from 'react'
import adoptionCenters from '../Data/AdoptionCenters.json'
import Select from 'react-select'
import Paginate from '../Components/Pagination'
import axios from 'axios'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const AdoptCentersPage = ({fetchPage}) => {
    const [allCenters, setAllCenters] = useState([])
    const [filterQueries, setFilterQueries] = useState([])
    const [queryString, setQueryString] = useState("")
    const [centersPerPage, setCentersPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])

    const fetchCenters = async (query) => {
        setIsLoading(true)
        const res = await axios.get(`https://api.adoptapet.me/ac?${query}`)
        setAllCenters(res.data.page)
        setIsLoading(false)
        setCentersPerPage(res.data.count)
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
    const fetchFilteredResults = (filter, option) => {
        if (filter && filter.label !== "None") {
            let tempFilterQueries = checkfilterQueries(filter)
            let tempQueryString = ""
            for (let i = 0; i < tempFilterQueries.length; i++) {
                if (tempFilterQueries.length != 1 && i + 1 != tempFilterQueries.length) {
                    tempQueryString = tempQueryString.concat(tempFilterQueries[i].type.concat("=", tempFilterQueries[i].label), "&")
                } else {
                    tempQueryString = tempQueryString.concat(tempFilterQueries[i].type.concat("=", tempFilterQueries[i].label))
                }
            }
            tempQueryString = tempQueryString.toLowerCase()
            setQueryString(tempQueryString)
            fetchCenters(tempQueryString)
        } else {
            for (let i = 0; i < filterQueries.length; i++) {
                if (option === filterQueries[i].type) {
                    let newQueries = [...filterQueries];
                    newQueries.splice(i, 1)
                    setFilterQueries([...newQueries])
                }
            }
        }
    }
    return (
        <div style={{paddingLeft: '10vw', paddingRight: '10vw'}}>
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
            <Row style={{paddingBottom: '2vh'}}>
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
                    <h6>Center Type</h6>
                    <Select options={[{value: 'type1', label: 'None', type: 'type'}, {value: 'type2', label: 'Rescue', type: 'type'}, {value: 'type3', label: 'Shelter', type: 'type'}]} 
                        isSearchable={true}
                        isClearable={true}
                        onChange={(option) => fetchFilteredResults(option, 'type')}
                    />
                </Col>
                <Col>
                    <h6>Sort Name(Asc.)</h6>
                    <Select options={[{value: 'sort1', label: 'None', type: 'sort'}, {value: 'sort2', label: 'Name', type: 'sort'}]} 
                        isSearchable={true}
                        isClearable={true}
                        onChange={(filter) => fetchFilteredResults(filter, 'sort')}
                    />
                </Col>
            </Row>
            <div style={{ paddingTop: '2vh'}}>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
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
                    <Link to={`/acmodel/${center.api_id}`} style={{ textDecoration: 'none'}} onClick={() => whichCenterPage("ac", center.api_id)}>
                        <td>{center.name}</td>
                    </Link>
                    <td>{center.city}</td>
                    <td>{center.state}</td>
                    <td>{center.zipcode}</td>
                    <td>{center.type}</td>
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
