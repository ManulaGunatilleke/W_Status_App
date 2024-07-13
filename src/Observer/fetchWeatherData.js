const axios = require('axios');

const fetchWeatherData = async (location) => {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY; //API_KEY
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        return {
            description: weatherData.weather[0].description,
            temperature: weatherData.main.temp,
            timestamp: new Date()
        };
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
        return null;
    }
};

module.exports = fetchWeatherData;
