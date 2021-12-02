import axios from "axios"
import React, { useEffect, useState } from "react"
import BubbleChart from '@weknow/react-bubble-chart-d3'
import { PieChart, Pie, Cell, Tooltip, Funnel, FunnelChart, LabelList } from "recharts"
import { parseVisData } from './Filtering'

const Visualizations = () => {
  // State variable data for the three visualizations
  const [data, setData] = useState([])
  const [originData, setOriginData] = useState([])
  const [statesData, setStatesData] = useState([])

  useEffect(() => {
    /**
     * Parses API data and returns formatted data for visualization
     * @param {List[AdoptablePets]} data
     * @return {
     *    breed_name: String (Pet breed)
     *    value: <Value> (number of breed)
     * }
     */
    // Getting data on component load.
    const getData = async () => {
      const breeds = await axios.get(`https://api.adoptapet.me/ap?breednames&page=-1`)
      const origins = await axios.get(`https://api.adoptapet.me/sb?origins&page=-1`)
      const states = await axios.get(`https://api.adoptapet.me/ac?states&page=-1`)
      let tempBreeds = breeds.data.page.map((el) => el.breed_name)
      let tempOrigins = origins.data.page.map((el) => el.origin)
      let tempStates = states.data.page.map((el) => el.state)
      const parsedData = parseVisData(tempBreeds, true)
      const originsParsedData = parseVisData(tempOrigins, false)
      const statesParsedData = parseVisData(tempStates, false)
      setData(parsedData)
      setOriginData(originsParsedData)
      setStatesData(statesParsedData)
    }
    getData()
  }, [])
  return (
    <div>
      <h2>Pet Breeds</h2>
      <div>
        {/* Using the BubbleChart from D3, and passing in required props */}
        <BubbleChart
          graph={{
            zoom: 0.7,
            offsetX: 0.0,
            offsetY: 0.0
          }}
          showLegend={false}
          width={1000}
          height={800}
          valueFont={{
            family: "Arial",
            size: 12,
            color: "#fff",
            weight: "bold"
          }}
          labelFont={{
            family: "Arial",
            size: 16,
            color: "#fff",
            weight: "bold"
          }}
          data={data}
        />
      </div>
      <div>
        <h2>Species Origin Countries</h2>
        {/* Using the pie chart from recharts and providing required props */}
        <PieChart width={1000} height={1000}>
          <Pie data={originData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={400} label labelLine>
            {
              originData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill}>
                </Cell>
              ))
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div>
        <h2>Adoption Center State</h2>
        {/* Using the funnel chart from recharts and providing required props */}
        <FunnelChart width={1000} height={1000}>
          <Tooltip />
          <Funnel
            dataKey="value"
            data={statesData}
            isAnimationActive
          >
            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
          </Funnel>
        </FunnelChart>
      </div>
    </div>
  )
}

export default Visualizations