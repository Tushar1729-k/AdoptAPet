import React from 'react'
import { Row, Table, Col } from 'react-bootstrap'
import {  useState, useEffect } from 'react'
import Species from '../Data/Species.json'
import Breeds from '../Data/breeds2.json'
import Paginate from '../Components/Pagination'
import axios from 'axios'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const SpeciesModelPage = ({fetchPage}) => {
    const [allBreeds, setAllBreeds] = useState([])
    const [breedsPerPage, setBreedsPerPage] = useState(10)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchBreeds = async (pageNum) => {
        setIsLoading(true)
        const res = await axios.get(`https://api.adoptapet.me/sb?page=${pageNum}`)
        setAllBreeds(res.data.page)
        setIsLoading(false)
        setBreedsPerPage(res.data.count)
    }

    useEffect(() => {
        fetchBreeds(1)
    }, [])
    const paginate = (num) => {
        setCurrentPage(num)
        fetchBreeds(num)
    }
    return (
        <div style={{paddingLeft: '10vw', paddingRight: '10vw'}}>
            <Row>
                <Col>
                    <h2>Species</h2>
                    <h5>20 species, page {currentPage}/19</h5>
                    {isLoading && <h4>Loading...</h4>}
                </Col>
                <Col>
                    <Paginate totalItems={368} itemsPerPage={20} paginate={paginate} />
                </Col>
            </Row>
            <div style={{ paddingTop: '2vh'}}>
            <Table striped bordered hover size="sm">
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
                    <td>{breed.species_name}</td>
                    <Link to={`/sbmodel/${breed.api_id}`} style={{ textDecoration: 'none'}} onClick={() => fetchPage("sb", breed.api_id)}>
                        <td>{breed.breed_name}</td>
                    </Link>
                    <td>{breed.life_span ? breed.life_span : "N/A"}</td>
                    <td>{breed.weight ? breed.weight : "N/A"}</td>
                    <td>{breed.origin ? breed.origin : "N/A"}</td>
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
