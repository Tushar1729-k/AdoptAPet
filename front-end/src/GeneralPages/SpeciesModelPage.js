import React from 'react'
import { Row, Table } from 'react-bootstrap'
import Species from '../Data/Species.json'
import Breeds from '../Data/breeds2.json'
import {Link} from 'react-router-dom'

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
                    <th>Life Expectancy</th>
                    <th>Size</th>
                    <th>Potential Health Issues</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Cat</td>
                    <Link to={`/sbmodel/1`} style={{ textDecoration: 'none'}}>
                        <td>Domestic Short Hair</td>
                    </Link>
                    <td>15 - 20 years</td>
                    <td>Medium/Large</td>
                    <td>Ocular, Respiratory, Gum disease, Obesity</td>
                    </tr>
                    <tr>
                    <td>Dog</td>
                    <Link to={`/sbmodel/2`} style={{ textDecoration: 'none'}}>
                    <td>Beagle</td>
                    </Link>
                    <td>10 - 15 years</td>
                    <td>Small/Medium</td>
                    <td>Epilepsy, Dysplasia, Hypythyroidism</td>
                    </tr>
                    <tr>
                    <td>Dog</td>
                    <Link to={`/sbmodel/3`} style={{ textDecoration: 'none'}}>
                    <td>Pit Bull Terrier</td>
                    </Link>
                    <td>12 - 13 years</td>
                    <td>Medium/Large</td>
                    <td>Kidney, Heart</td>
                    </tr>
                </tbody>
                </Table>
                </div>
        </div>
    )
}

export default SpeciesModelPage
