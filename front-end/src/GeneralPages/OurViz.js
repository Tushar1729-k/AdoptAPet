import axios from "axios"
import React, { useEffect, useState } from "react"
import BubbleChart from '@weknow/react-bubble-chart-d3'


const PetsChart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    /**
     * Parses API data and returns formatted data for visualization
     * @param {List[AdoptablePets]} data
     * @return {
     *    breed_name: String (Pet breed)
     *    value: <Value> (number of breed)
     * }
     */
    const parseData = (inputMap) => {
        const list = [];

        inputMap.forEach((value, key) => {
          const obj = {};
          obj["label"] = key
          obj["value"] = value
          list.push(obj)
        })
        console.log(JSON.stringify(list))
        return JSON.stringify(list)
      }

    const getData = async () => {
      const params = new URLSearchParams({ page: -1 })
      const breeds = await axios.get(`https://api.adoptapet.me/ap?breednames`)
      let tempBreeds = breeds.data.page.map((el) => el.breed_name)
      const breedsMap = new Map()
      // console.log(tempBreeds)
      for (var key in tempBreeds) {
        // console.log(tempBreeds[key])
        breedsMap.set(tempBreeds[key], typeof breedsMap.get(tempBreeds[key]) !== 'undefined' ? breedsMap.get(tempBreeds[key])+1 : 1)
      }
      // console.log(breedsMap)
      const parsedData = parseData(breedsMap)
      setData(parsedData)
    }
    getData()
  })

  return (
    <>
      <h2>Pet breed counts</h2>
      <div>
        {/* <BubbleChart
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
        /> */}
        {/* <BubbleChart/> */}
      </div>
    </>
  )

}

export default PetsChart