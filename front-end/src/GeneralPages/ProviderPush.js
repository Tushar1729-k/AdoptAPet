import axios from "axios"

const parseData = (inputMap) => {
  const list = []

  inputMap.forEach((value, key) => {
    const obj = {};
    obj["gender"] = key
    obj["artists"]
  })

}


const getData = async () => {
  const params = new URLSearchParams({ page: -1 })
  const artists = await axios.get(`https://api.gallerygaze.me/artists`)
  let tempArtists = artists.data.artists
  page = page.filter((tempArtists) => tempArtists.gender)
  const artistsMap = new Map()
  for (var key in tempArtists) {
    artistsMap.set(tempArtists[key], typeof artistsMap.get(tempArtists[key]) !== 'undefined' ? artistsMap.get(tempArtists[key])+1 : 1)
  }
  console.log(artistsMap)
  const parsedData = parseData(artistsMap)
  setData(parsedData)
}