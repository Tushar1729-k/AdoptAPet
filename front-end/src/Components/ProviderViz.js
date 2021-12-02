import axios from "axios"
import React, { useEffect, useState } from "react"
import BubbleChart from '@weknow/react-bubble-chart-d3'
import { PieChart, Pie, Cell, Tooltip, Funnel, FunnelChart, LabelList } from "recharts"
import { parseVisData } from './Filtering'

const ProviderViz = () => {
  // State variable data for the three visualizations
  const [genresData, setGenresData] = useState([])
  const [nationsData, setNationsData] = useState([])
  const [statesData, setStatesData] = useState([])

  useEffect(() => {
    // Getting data on component load.
    const getData = async () => {
      const genres = await axios.get(`https://api.gallerygaze.me/search?model=artwork`)
      const nationalities = await axios.get(`https://api.gallerygaze.me/search?model=artist`)
      const countries = await axios.get(`https://api.gallerygaze.me/search?model=museum`)
      let tempGenres = genres.data["query results"].map((el) => el.genre)
      let tempNations = nationalities.data["query results"].map((el) => el.nationality)
      let tempCountries = countries.data["query results"].map((el) => el.country)
      const parsedDates = parseVisData(tempGenres, true)
      const nationsParsedData = parseVisData(tempNations, false)
      const countriesParsedData = parseVisData(tempCountries, false)
      setGenresData(parsedDates)
      setNationsData(nationsParsedData)
      setStatesData(countriesParsedData)
    }
    getData()
  }, [])
  return (
    <div>
      <h2>Artwork Genres</h2>
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
          data={genresData}
        />
      </div>
      <div>
        <h2>Artist Nationalities</h2>
        {/* Using the pie chart from recharts and providing required props */}
        <PieChart width={1000} height={1000}>
          <Pie data={nationsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={400} label labelLine>
            {
              nationsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill}>
                </Cell>
              ))
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div>
        <h2>Museum Countries</h2>
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

export default ProviderViz