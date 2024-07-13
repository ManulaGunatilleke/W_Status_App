const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherDataSchema = new Schema({
    date: { type: Date, default: Date.now },
    temperature: { type: Number },
    description: { type: String }
});

const userSchema = new Schema({
    Fullname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    WeatherData: {
        type: [weatherDataSchema]  // Embedding WeatherData schema as an array of objects
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;
