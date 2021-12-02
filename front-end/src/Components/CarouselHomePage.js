import React from 'react'
import { Carousel } from 'react-bootstrap'
import beagle_1 from '../Images/beagle_1.jpg'
import DogHomePage from "../Images/dog_home_page.jpg"
import DomesticShortHair from "../Images/domestic_short_hair_2.jpg"

const CarouselHomePage = () => {
    return (
        <div>
            {/* Using Carousel component from react bootstrap to display three pet images for home page. */}
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={DogHomePage}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Give a Home</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={beagle_1}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Give them a Family</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={DomesticShortHair}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Find a Pet Today</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default CarouselHomePage
