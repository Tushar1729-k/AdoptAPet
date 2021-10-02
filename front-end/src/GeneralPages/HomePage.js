import React from 'react'
import { Card } from 'react-bootstrap'
import DogHomePage from "../Images/dog_home_page.jpg"

const HomePage = () => {
    return (
        <div>
            <Card className="bg-dark text-white">
                <Card.Img src="../Images/dog_home_page.jpg" alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title>Adopt a Pet</Card.Title>
                    <Card.Text>
                        Find a pet to give a home to.
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        </div>
    )
}

export default HomePage
