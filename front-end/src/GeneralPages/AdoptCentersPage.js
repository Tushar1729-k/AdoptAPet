import React from 'react'
import { Row, Table } from 'react-bootstrap'
import adoptionCenters from '../Data/AdoptionCenters.json'
import { Link } from "react-router-dom"

const AdoptCentersPage = () => {
    return (
        <div style={{paddingLeft: '10vw', paddingRight: '10vw'}}>
            <Row>
                <h2>Adoption Centers</h2>
            </Row>
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
                {Array.from({ length: 3 }).map((_, index) => (
                    <tr key={index}>
                    <Link to={`/acmodel/${adoptionCenters[index].orgID}`} style={{ textDecoration: 'none'}}>
                        <td>{adoptionCenters[index].name}</td>
                    </Link>
                    <td>{adoptionCenters[index].city}</td>
                    <td>{adoptionCenters[index].state}</td>
                    <td>{adoptionCenters[index].zip}</td>
                    <td>{adoptionCenters[index].services}</td>
                    </tr>
                ))}
                </tbody>
                </Table>
                </div>
        </div>
    )
}

export default AdoptCentersPage
