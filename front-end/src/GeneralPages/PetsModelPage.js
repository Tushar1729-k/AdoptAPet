import React from 'react'
import {  useState, useEffect } from 'react'
import { Row, Col, Card, ListGroup, Dropdown, FormControl } from 'react-bootstrap'
import Select from 'react-select'
import { Link } from "react-router-dom"
import pets from '../Data/AnimalsData.json'
import Paginate from '../Components/Pagination'
import axios from 'axios'
import PropTypes from 'prop-types'

const PetsModelPage = ({fetchPage}) => {
    const [allPets, setAllPets] = useState([])
    const [numOfPets, setNumOfPets] = useState(430)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [filterQueries, setFilterQueries] = useState([])
    const [queryString, setQueryString] = useState("")

    const fetchPets = async (query) => {
        setIsLoading(true)
        const res = await axios.get(`https://api.adoptapet.me/ap?${query}`)
        console.log("data", res.data)
        setAllPets(res.data.page)
        setNumOfPets(res.data.count)
        console.log(allPets)
        setIsLoading(false)
    }
    const filterOptions = (arr, val) => {
        let temp = [...new Set(arr)]
        temp = temp.map((el) => {
            return {value: `${val}${el}`, label: el, type: val}
        })
        temp.unshift({value: val, label: "None", type: val})
        return temp
    }
    let colors = allPets.map((el) => el.color)
    colors = filterOptions(colors, 'color')
    let sexes = allPets.map((el) => el.sex)
    sexes = filterOptions(sexes, 'sex')
    let breeds = allPets.map((el) => el.species_breed.breed_name)
    breeds = filterOptions(breeds, 'breeds')
    const options = [
        breeds,
        sexes,
        colors
    ]
    const optionLabels = ['Breed', 'Sex', 'Color']
    useEffect(() => {
        fetchPets(`page=1`)
    }, [])
    const paginate = (num) => {
        setCurrentPage(num)
        console.log(queryString)
        if (queryString) {
            fetchPets(`page=${num}&${queryString}`)
        } else {
            fetchPets(`page=${num}`)
        }
    }
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
            fetchPets(tempQueryString)
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
        <div style={{padding: '4vw'}}>
            <Row xs={1}>
                <Col>
                    <h2>Adoptable Pets</h2>
                    <h5>20 pets, page {currentPage}/107</h5>
                    {isLoading && <h4>Loading...</h4>}
                </Col>
                <Col>
                    <Paginate totalItems={numOfPets} itemsPerPage={20} paginate={paginate}/>
                </Col>
            </Row>
            <Row style={{paddingBottom: '2vh'}}>
            {Array.from({length: 3}).map((_, idx) => (
                    <Col key={idx}>
                        <h6>{optionLabels[idx]}</h6>
                        <Select options={options[idx]} defaultValue="Name" isSearchable={true}
                            onChange={(option) => fetchFilteredResults(option, options[idx][0].type)}
                            isClearable={true}
                        />
                    </Col>
                ))}
                <Col>
                    <h6>Age</h6>
                    <Select options={[{value: 'age1', label: 'None', type: 'age'}, {value: 'age2', label: 'Baby', type: 'age'}, {value: 'age3', label: 'Young', type: 'age'}, {value: 'age4', label: 'Adult', type: 'age'}, {value: 'age5', label: 'Senior', type: 'age'}]} 
                        defaultValue="Name" isSearchable={true}
                        onChange={(option) => fetchFilteredResults(option, 'age')}
                        isClearable={true}
                    />
                </Col>
                <Col>
                    <h6>Size</h6>
                    <Select options={[{value: 'size1', label: 'None', type: 'size'}, {value: 'size2', label: 'Small', type: 'size'}, {value: 'size3', label: 'Medium', type: 'size'}, {value: 'size4', label: 'Large', type: 'size'}]} 
                        defaultValue="Name" isSearchable={true}
                        onChange={(option) => fetchFilteredResults(option, 'size')}
                        isClearable={true}
                    />
                </Col>
                <Col>
                    <h6>Sort(Asc.)</h6>
                    <Select options={[{value: 'sort1', label: 'None', type: 'sort'}, {value: 'sort2', label: 'Name', type: 'sort'}, {value: 'sort3', label: 'Age', type: 'sort'},
                        {value: 'sort4', label: 'Size', type: 'sort'}, {value: 'sort5', label: 'Color', type: 'sort'}, {value: 'sort6', label: 'Sex', type: 'sort'}]} 
                        defaultValue="Name" isSearchable={true}
                        onChange={(option) => fetchFilteredResults(option)}
                        isClearable={true}
                    />
                </Col>
            </Row>
            <Row xs={1} md={4} className="g-4">
                {allPets.map((pet, idx) => (
                    <Link key={idx} to={`/apmodel/${pet.api_id}`} style={{ textDecoration: 'none'}} onClick={() => fetchPage("ap", pet.api_id)}>
                        <Col>
                        <Card>
                            <img variant="top" src={pet.pic_url} style={{width: '100%', height: '400px'}} />
                            <Card.Body style={{backgroundColor: "#00008b", color: "white"}}>
                            <Card.Title style={{fontSize: '4vh'}}>{pet.name}</Card.Title>
                            <Card.Subtitle style={{fontSize: '2vh'}} className="mb-2 text-muted">{pet.species_breed.breed_name}</Card.Subtitle>
                            <ListGroup horizontal>
                            <ListGroup.Item>Sex : {pet.sex}</ListGroup.Item>
                            <ListGroup.Item>Age : {pet.age != "" ? pets[idx].age : "Not Available"}</ListGroup.Item>
                            <ListGroup.Item>Color : {pet.color != "" ? pets[idx].color : "Exact Color NA"}</ListGroup.Item>
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

PetsModelPage.propTypes = {
    fetchPage: PropTypes.func,
    children: PropTypes.array,
    style: PropTypes.object,
    onClick: PropTypes.func
}

export default PetsModelPage
