import React from 'react'
import {  useState, useEffect } from 'react'
import { Row, Col, Card, ListGroup } from 'react-bootstrap'
import { Link } from "react-router-dom"
import pets from '../Data/AnimalsData.json'
import Paginate from '../Components/Pagination'
import axios from 'axios'

const PetsModelPage = () => {
    const [allPets, setAllPets] = useState([])
    const [petsPerPage, setPetsPerPage] = useState(10)

    const fetchPets = async (pageNum) => {
        const res = await axios.get(`https://api.adoptapet.me/ap?page=${pageNum}`)
        setAllPets(res.data.page)
        setPetsPerPage(res.data.count)
    }

    useEffect(() => {
        fetchPets(1)
    }, [])
    const paginate = (num) => {
        fetchPets(num)
    }
    return (
        <div style={{padding: '4vw'}}>
            <Row xs={1} md={2} className="g-4">
                {allPets.map((pet, idx) => (
                    <Link key={idx} to={`/apmodel/${pet.api_id}`} style={{ textDecoration: 'none'}}>
                        <Col>
                        <Card>
                            <img variant="top" src={pet.pic_url} style={{width: '100%', height: '400px'}} />
                            <Card.Body>
                            <Card.Title style={{fontSize: '4vh'}}>{pet.name}</Card.Title>
                            <Card.Subtitle style={{fontSize: '2vh'}} className="mb-2 text-muted">{pets[idx].breed}</Card.Subtitle>
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
            <Paginate totalItems={600} itemsPerPage={petsPerPage} paginate={paginate}/>
        </div>
    )
}

export default PetsModelPage
