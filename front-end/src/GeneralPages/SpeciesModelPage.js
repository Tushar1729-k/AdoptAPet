import React from 'react'
import { Row, Table } from 'react-bootstrap'
import Species from '../Data/Species.json'
import Breeds from '../Data/breeds2.json'

const SpeciesModelPage = () => {
    return (
        <div style={{paddingLeft: '10vw', paddingRight: '10vw'}}>
            <Row>
                <h2>Species</h2>
            </Row>
            <div style={{ paddingTop: '2vh'}}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Species</th>
                    <th>Breeds</th>
                    <th>Color</th>
                    <th>Pattern</th>
                    {/* <th>Link</th> */}
                    </tr>
                </thead>
                <tbody>
                {Array.from({ length: 25 }).map((_, index) => (
                    <tr key={index}>
                    <td>{Species.data[index].attributes.singular}</td>
                    <td>{Breeds.data[622].attributes.name}</td>
                    {/* <td>{Species.data[index].relationships.species.links.self}</td> */}
                    </tr>
                ))}
                </tbody>
                </Table>
                </div>
        </div>
    )
}

export default SpeciesModelPage
