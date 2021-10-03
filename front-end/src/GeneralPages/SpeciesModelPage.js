import React from 'react'
import { Row, Table } from 'react-bootstrap'
import breeds from '../Data/Breeds.json'

const SpeciesModelPage = () => {
    return (
        <div style={{paddingLeft: '10vw', paddingRight: '10vw'}}>
            <Row>
                <h2>Breeds</h2>
            </Row>
            <div style={{ paddingTop: '2vh'}}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Breeds</th>
                    <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                {Array.from({ length: 100 }).map((_, index) => (
                    <tr key={index}>
                    <td>{breeds.data[index].attributes.name}</td>
                    <td>{breeds.data[index].relationships.species.links.self}</td>
                    </tr>
                ))}
                </tbody>
                </Table>
                </div>
        </div>
    )
}

export default SpeciesModelPage
