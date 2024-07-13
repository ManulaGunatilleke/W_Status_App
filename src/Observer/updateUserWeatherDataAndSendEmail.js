const User = require('../models/user');
const fetchWeatherData = require('./fetchWeatherData');
const sendEmailNotification = require('./sendEmailNotification');

const updateUserWeatherDataAndSendEmail = async () => {
    try {
        const users = await User.find();

        for (let user of users) {
            const weatherData = await fetchWeatherData(user.Location);

            if (weatherData) {
                // Check if user already has weather data
                if (user.WeatherData.length > 0) {
                    // Update the existing weather data object insted of every time creating a new object
                    const existingWeatherData = user.WeatherData[0]; 
                    existingWeatherData.description = weatherData.description;
                    existingWeatherData.temperature = weatherData.temperature;
                    existingWeatherData.timestamp = weatherData.timestamp;
                    await user.save();
                } else {
                    // If no weather data exists, push the new weather data object
                    user.WeatherData.push(weatherData);
                    await user.save();
                }

                await sendEmailNotification(user.Email, weatherData);
            }
        }
    } catch (error) {
        console.error(`Error updating user weather data: ${error.message}`);
    }
};

module.exports = updateUserWeatherDataAndSendEmail;
