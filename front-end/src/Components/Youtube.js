import React from 'react'
import {useState} from 'react'
import YoutubeAPI from './YoutubeAPI'
import { Button } from 'react-bootstrap'
import YouTube from 'react-youtube'
import PropTypes from 'prop-types'

const YoutubePlayer = ({searchQuery}) => {
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      }
    const [videoIDs, setVideoIDs] = useState([])
    const onSearch = async(searchTerm) => {
        console.log(searchTerm)
        const res = await YoutubeAPI.get("/search",{params: {q: searchTerm}})
        setVideoIDs(res.data.items)
    }
    const _onReady = (event) => {
        event.target.pauseVideo();
      }
    return (
        <div>
            <Button onClick={() => onSearch(searchQuery)}>Youtube</Button>
            {videoIDs.map((vid, idx) => (
                <div key={idx}>
                <YouTube videoId={vid.id.videoId} opts={opts} onReady={_onReady} />
                </div>
            ))}
        </div>
    )
}

YoutubePlayer.defaultProps = {
    searchQuery: ''
}
// Set type of the prop here.
YoutubePlayer.propTypes = {
    searchQuery: PropTypes.string
}

export default YoutubePlayer
