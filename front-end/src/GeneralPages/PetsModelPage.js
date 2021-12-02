import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, Card, ListGroup, Tabs, Tab, Button } from 'react-bootstrap'
import { filterOptions, getFilterQueries } from '../Components/Filtering'
import Select from 'react-select'
import Highlighter from "react-highlight-words"
import { Link, useHistory } from "react-router-dom"
import Paginate from '../Components/Pagination'
import axios from 'axios'
import PropTypes from 'prop-types'

const PetsModelPage = ({ fetchPage }) => {
  const [allPets, setAllPets] = useState([])
  const [numOfPets, setNumOfPets] = useState(430)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [filterQueries, setFilterQueries] = useState([])
  const [queryString, setQueryString] = useState("")
  const [options, setOptions] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  let history = useHistory()
  // Fetch pets data from the pets endpoint, depending on the query.
  const fetchPets = async (query) => {
    setIsLoading(true)
    const res = await axios.get(`https://api.adoptapet.me/ap?${query}`)
    setAllPets(res.data.page)
    setNumOfPets(res.data.count)
    setIsLoading(false)
  }
  // Fetching 2 of the filter/sort options from the adoption center endpoint.
  const fetchOptions = async () => {
    const colors = await axios.get(`https://api.adoptapet.me/ap?colors`)
    const breeds = await axios.get(`https://api.adoptapet.me/ap?breednames`)
    let tempColors = colors.data.page.map((el) => el.color)
    tempColors.sort()
    let tempBreeds = breeds.data.page.map((el) => el.breed_name)
    tempBreeds.sort()
    let colorOptions = filterOptions(tempColors, "color")
    let breedOptions = filterOptions(tempBreeds, "breeds")
    setOptions([breedOptions, colorOptions])
  }
  const optionLabels = ['Breed', 'Color']
  useEffect(() => {
    fetchPets(`page=1`)
    fetchOptions()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) {
      params.append("name", searchQuery)
    } else {
      params.delete("name")
    }
    history.push({ search: params.toString() })
  }, [searchQuery, history])
  // Depending on which page is clicked on, the corresponding data is pulled from the DB.
  const paginate = (num) => {
    setCurrentPage(num)
    if (queryString) {
      fetchPets(`page=${num}&${queryString}`)
    } else {
      fetchPets(`page=${num}`)
    }
  }
  // Function to set the filter query depending on which filters are selected.
  const fetchFilteredResults = (filter, option) => {
    let res = getFilterQueries(filter, option, filterQueries)
    setQueryString(res.query)
    setFilterQueries([...res.filters])
    // If no filters are selected, the data for the current page in pagination is fetched.
    if (res.query === "") {
      fetchPets(`page=${currentPage}`)
    } else {
      fetchPets(res.query)
    }
  }
  // Function specifically to call fetchPets for any search queries in search bar.
  const fetchSearchResults = () => {
    fetchPets(`q=${searchQuery}`)
  }
  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      fetchSearchResults()
    }
  }
  return (
    <div style={{ padding: '4vw' }}>
      <Row xs={1}>
        <Col>
          <h2>Adoptable Pets</h2>
          <h5>20 pets, page {currentPage}/107</h5>
          {isLoading && <h4>Loading...</h4>}
        </Col>
        <Col>
          <Paginate totalItems={numOfPets} itemsPerPage={20} paginate={paginate} />
        </Col>
      </Row>
      <Row style={{ paddingBottom: '2vh', color: '#00008b' }}>
        {/* One tab has the filters, and the other tab has the search functionality. */}
        <Tabs defaultActiveKey="sort" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="sort" title="Sort">
            <Row>
              {/* First two filters */}
              {Array.from({ length: 2 }).map((_, idx) => (
                <Col key={idx}>
                  <h6>{optionLabels[idx]}</h6>
                  <Select options={options[idx]} defaultValue="Name" isSearchable={true}
                    onChange={(option) => fetchFilteredResults(option, options[idx][0].type)}
                    isClearable={true}
                  />
                </Col>
              ))}
              {/* Hard coding the other four filters/sort since the options are limited. */}
              <Col>
                <h6>Sex</h6>
                <Select options={[{ value: 'sex1', label: 'None', type: 'sex' }, { value: 'sex2', label: 'Male', type: 'sex' }, { value: 'sex3', label: 'Female', type: 'sex' }]}
                  defaultValue="Name" isSearchable={true}
                  onChange={(option) => fetchFilteredResults(option, 'sex')}
                  isClearable={true}
                />
              </Col>
              <Col>
                <h6>Age</h6>
                <Select options={[{ value: 'age1', label: 'None', type: 'age' }, { value: 'age2', label: 'Baby', type: 'age' }, { value: 'age3', label: 'Young', type: 'age' }, { value: 'age4', label: 'Adult', type: 'age' }, { value: 'age5', label: 'Senior', type: 'age' }]}
                  defaultValue="Name" isSearchable={true}
                  onChange={(option) => fetchFilteredResults(option, 'age')}
                  isClearable={true}
                />
              </Col>
              <Col>
                <h6>Size</h6>
                <Select options={[{ value: 'size1', label: 'None', type: 'size' }, { value: 'size2', label: 'Small', type: 'size' }, { value: 'size3', label: 'Medium', type: 'size' }, { value: 'size4', label: 'Large', type: 'size' }]}
                  defaultValue="Name" isSearchable={true}
                  onChange={(option) => fetchFilteredResults(option, 'size')}
                  isClearable={true}
                />
              </Col>
              <Col>
                <h6>Sort(Asc.)</h6>
                <Select options={[{ value: 'sort1', label: 'None', type: 'sort' }, { value: 'sort2', label: 'Name', type: 'sort' }, { value: 'sort3', label: 'Age', type: 'sort' },
                { value: 'sort4', label: 'Size', type: 'sort' }, { value: 'sort5', label: 'Color', type: 'sort' }]}
                  defaultValue="Name" isSearchable={true}
                  onChange={(option) => fetchFilteredResults(option)}
                  isClearable={true}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="search" title="Search">
            <Row style={{ color: '#00008b' }}>
              <h3>Pet Search</h3>
              {/* This column holds the actual text box to enter a search query. */}
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
      <Row xs={1} md={4} className="g-4">
        {/* Rows of 4 cards are used to display pet options for the model page */}
        {allPets.map((pet, idx) => (
          // Each card is wrapped in a link, so clicking anywhere will take user to instance page.
          <Link key={idx} to={`/apmodel/${pet.api_id}`} style={{ textDecoration: 'none' }} onClick={() => fetchPage("ap", pet.api_id)}>
            <Col>
              <Card>
                <img variant="top" src={pet.pic_url} style={{ width: '100%', height: '400px' }} />
                {/* Highlighter component wraps each piece of info so that they are highlighted if they match a search query */}
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

PetsModelPage.propTypes = {
  fetchPage: PropTypes.func,
  children: PropTypes.array,
  style: PropTypes.object,
  onClick: PropTypes.func
}

export default PetsModelPage
