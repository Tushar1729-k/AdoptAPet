import React from 'react'
import { useState } from 'react'
import YoutubeAPI from './YoutubeAPI'
import { Button } from 'react-bootstrap'
import YouTube from 'react-youtube'
import PropTypes from 'prop-types'
import { PlayBtnFill } from 'react-bootstrap-icons';

const YoutubePlayer = ({ searchQuery }) => {
    // Setting the default attributes of the youtube player.
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1
        },
    }
    const [videoIDs, setVideoIDs] = useState([])
    const onSearch = async (searchTerm) => {
        // Using the youtube api to fetch the requested videos.
        const res = await YoutubeAPI.get("/search", { params: { q: searchTerm } })
        setVideoIDs(res.data.items)
    }
    const _onReady = (event) => {
        event.target.pauseVideo();
    }
    return (
        <div>
            <div style={{ paddingLeft: "27.5vw", paddingBottom: "2vh" }}>
                {/* When user clicks this button, youtube videos correlating
                    to the instance page will be fetched. */}
                <Button variant="danger" style={{ width: '10vw' }} onClick={() => onSearch(searchQuery)}>{<PlayBtnFill />}</Button>
            </div>
            {videoIDs.map((vid, idx) => (
                <div key={idx}>
                    {/* Using Youtube component from react-youtube */}
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
