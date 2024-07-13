const XMLHttpRequest = require('xhr2');
require('dotenv').config();

const sendEmailNotification = async (recipientEmail, weatherData) => {
    const serviceID = process.env.EMAILJS_SERVICE_ID; //EMAILJS_SERVICE_ID
    const templateID = process.env.EMAILJS_TEMPLATE_ID; //EMAILJS_TEMPLATE_ID
    const userID = process.env.EMAILJS_USER_ID; //EMAILJS_USER_ID

    const templateParams = {
        from_name: "Your Weather Service",
        weather_description: weatherData.description,
        temperature: weatherData.temperature,
        date: weatherData.timestamp.toISOString().slice(0, 10), // Format date to YYYY-MM-DD
        time: weatherData.timestamp.toISOString().slice(11, 16), // Format time to HH:MM
        user_email: recipientEmail,
    };

    const url = `https://api.emailjs.com/api/v1.0/email/send`;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${userID}`);

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(`Email sent to ${recipientEmail}`);
        } else {
            console.error(`Error sending email to ${recipientEmail}: ${xhr.statusText}`);
        }
    };

    xhr.onerror = function () {
        console.error(`Request failed`);
    };

    xhr.send(JSON.stringify({
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: templateParams
    }));
};

module.exports = sendEmailNotification;
