import React from 'react'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import ProviderViz from '../Components/ProviderViz'
import Visualizations from '../Components/Visualizations'

const VizPage = () => {

  return (
    // Importing the visualizations and displaying them in this page.
    <div style={{ padding: '4vw' }}>
      <Row xs={1}>
        <Col>
          <h2>Visualizations</h2>
        </Col>
      </Row>
      <Row style={{ paddingBottom: '2vh', color: '#00008b' }}>
        <Tabs defaultActiveKey="our-viz" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="our-viz" title="Our visualizations">
            <Visualizations />
          </Tab>
          <Tab eventKey="provider-viz" title="Provider visualizations">
            <ProviderViz />
          </Tab>
        </Tabs>
      </Row>

    </div>
  );

}

export default VizPage