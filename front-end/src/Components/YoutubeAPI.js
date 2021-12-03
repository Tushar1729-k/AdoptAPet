import React from 'react'
import axios from 'axios'
// Personal API key for using Google APIs.
const apiKey = "AIzaSyCD6X1ARbFEh9eXKDW4EbN-kNIHz-_dlaM"


export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 3,
        key: apiKey
    },
    headers: {}
})
