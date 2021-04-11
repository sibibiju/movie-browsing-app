require('dotenv').config();

module.exports = {
    apiKey: process.env.IBM_API_KEY,
    apiBaseUrl: process.env.IBM_API_BASE_URL,
    imageBaseUrl: process.env.IBM_IMAGE_BASE_URL,
    nowPlayingUrl: process.env.IBM_API_BASE_URL + "/movie/now_playing?api_key=" + process.env.IBM_API_KEY
}