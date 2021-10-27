import React from 'react'
import { Row, Table, Col } from 'react-bootstrap'
import {  useState, useEffect } from 'react'
import adoptionCenters from '../Data/AdoptionCenters.json'
import Paginate from '../Components/Pagination'
import axios from 'axios'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const AdoptCentersPage = ({fetchPage}) => {
    const [allCenters, setAllCenters] = useState([])
    const [centersPerPage, setCentersPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const fetchCenters = async (pageNum) => {
        setIsLoading(true)
        const res = await axios.get(`https://api.adoptapet.me/ac?page=${pageNum}`)
        setAllCenters(res.data.page)
        setIsLoading(false)
        setCentersPerPage(res.data.count)
    }

    useEffect(() => {
        fetchCenters(1)
    }, [])
    const paginate = (num) => {
        setCurrentPage(num)
        fetchCenters(num)
    }
    const whichCenterPage = (type, num) => {
        fetchPage(type, num)
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
            <div style={{ paddingTop: '2vh'}}>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Services</th>
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
                    <td>{center.services}</td>
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
