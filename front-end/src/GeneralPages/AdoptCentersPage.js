import React from 'react'
import { Row, Table } from 'react-bootstrap'
import {  useState, useEffect } from 'react'
import adoptionCenters from '../Data/AdoptionCenters.json'
import Paginate from '../Components/Pagination'
import axios from 'axios'
import { Link } from "react-router-dom"

const AdoptCentersPage = () => {
    const [allCenters, setAllCenters] = useState([])
    const [centersPerPage, setCentersPerPage] = useState(10)

    const fetchCenters = async (pageNum) => {
        const res = await axios.get(`https://api.adoptapet.me/ac?page=${pageNum}`)
        setAllCenters(res.data.page)
        setCentersPerPage(res.data.count)
    }

    useEffect(() => {
        fetchCenters(1)
    }, [])
    const paginate = (num) => {
        fetchCenters(num)
    }
    return (
        <div style={{paddingLeft: '10vw', paddingRight: '10vw'}}>
            <Row>
                <h2>Adoption Centers</h2>
            </Row>
            <h6>3 adoption centers, page 1/1</h6>
            <div style={{ paddingTop: '2vh'}}>
            <Table striped bordered hover size="sm">
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
                    <Link to={`/acmodel/${center.api_id}`} style={{ textDecoration: 'none'}}>
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
                <Row>
                    <Paginate totalItems={100} itemsPerPage={centersPerPage} paginate={paginate} />
                </Row>
        </div>
    )
}

export default AdoptCentersPage
