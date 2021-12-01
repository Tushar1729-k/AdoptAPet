import React from 'react'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import PetsChart from '../Components/OurViz'
import PropTypes from 'prop-types'

const VizPage = ({ fetchPage }) => {

  return (
    <div style={{ padding: '4vw' }}>
      <Row xs={1}>
        <Col>
          <h2>Visualizations</h2>
        </Col>
      </Row>
      <Row style={{ paddingBottom: '2vh', color: '#00008b' }}>
        <Tabs defaultActiveKey="our-viz" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="our-viz" title="Our visualizations">

            <PetsChart />

          </Tab>
          <Tab eventKey="provider-viz" title="Provider visualizations">

          </Tab>
        </Tabs>
      </Row>
      {/* <PetsChart /> */}

    </div>
  );

}

VizPage.propTypes = {
  fetchPage: PropTypes.func
}

export default VizPage