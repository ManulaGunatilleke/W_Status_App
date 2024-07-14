const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const connectToDatabase = require('./config/database');
const { authenticate } = require("./middleware/authMiddleware");
const cron = require('node-cron');
const updateUserWeatherDataAndSendEmail = require('../src/Observer/updateUserWeatherDataAndSendEmail');

//Initializing the port number
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.json());

//database and server connection
connectToDatabase(process.env.MONGODB_URL);

app.listen(PORT, () => {
    console.log(`server is up and running on port number: ${PORT}`)
})

// Schedule the task to run every 3 hours
cron.schedule('0 */3 * * *', async () => {
    console.log('Running weather data update and email notification task');
    await updateUserWeatherDataAndSendEmail();
});

// Schedule the task to run every minute
// cron.schedule('* * * * *', async () => {
//     console.log('Running weather data update and email notification task');
//     await updateUserWeatherDataAndSendEmail();
// });

// auth routes
const authRouter = require('./routes/authRoutes');
app.use('/auth',authRouter);

// admin routes
const adminRouter = require('./routes/adminRoutes');
app.use('/admin', adminRouter);

// user routes
const userRouter = require('./routes/userRoutes');
app.use('/user', userRouter);

// user routes 
// const userRouter = require('./routes/userRoutes');
// app.use('/user', authenticate, userRouter);

// role based authenticate
const authenticateRole = require('./routes/authenticateRole');
app.use('/authenticate-role', authenticateRole);
