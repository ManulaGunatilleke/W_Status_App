const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); 
const fetchWeatherData = require('../Observer/fetchWeatherData');

// Checking whether the same email has been used in each userType
const checkEmailExists = async (email) => {
    const admin = await Admin.findOne({ Email: email });
    const user = await User.findOne({ Email: email });

    return admin || user;
};

// Registering a new user
const userRegister = async (req, res) => {
    try {
        const { Fullname, Email, Password, Location } = req.body;
        const existingEmail = await checkEmailExists(Email);

        if (!existingEmail) {
            const hashPassword = await bcrypt.hash(Password, 10);

            // Fetch initial weather data
            const weatherData = await fetchWeatherData(Location);

            const user = new User({
                Fullname,
                Email,
                Password: hashPassword,
                Location,
                WeatherData: weatherData ? [weatherData] : [] // Initialize with fetched weather data
            });

            const token = jwt.sign({ _id: user._id }, 'secretkey123', {
                expiresIn: '60d',
            });

            await user.save();
            res.json({ message: 'User registration successful', token });
        } else {
            res.json({ message: 'This email already exists' });
        }
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
}

// Login part based on the type
const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        let user;
        let loginmessage;
        let type;

        const admin = await Admin.findOne({ Email });
        if (admin) {
            user = admin;
            loginmessage = "Admin logged in successfully!";
            type = 'admin';
        } else {
            const normalUser = await User.findOne({ Email });
            if (normalUser) {
                user = normalUser;
                loginmessage = "User logged in successfully!";
                type = 'user';
            } else {
                return res.status(404).json({ error: "Email not found" });
            }
        }

        const passwordMatch = await bcrypt.compare(Password, user.Password);

        if (passwordMatch) {
            const token = jwt.sign({ email: user.Email, type: type }, "Your_Secret_Token", { expiresIn: '1h' });
            return res.status(200).json({ message: loginmessage, token, user, type });
        } else {
            return res.status(401).json({ error: "Password incorrect" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all users
const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ status: "Error with fetching data", error: error.message });
    }
}

// Updating a user
const updateUser = async (req, res) => {
    try {
        let userId = req.params.id;
        const { Fullname, Email, Password, Location } = req.body;

        const updateUser = {
            Fullname,
            Email,
            Password,
            Location
        }

        await User.findByIdAndUpdate(userId, updateUser);
        res.status(200).send({ status: "User Updated" });
    } catch (error) {
        res.status(500).send({ status: "Error with updating data", error: error.message });
    }
}

// Deleting a single user
const deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;

        await User.findByIdAndDelete(userId);
        res.status(200).send({ status: "User deleted" });
    } catch (error) {
        res.status(500).send({ status: "Error with delete user", error: error.message });
    }
}

// Get the details of a single user
const singleUser = async (req, res) => {
    try {
        let userId = req.params.id;

        const user = await User.findById(userId);
        res.status(200).send({ status: "User fetched", user });
    } catch (error) {
        res.status(500).send({ status: "Error with fetching user", error: error.message });
    }
}

// Handle searching users
const searchUsers = async (req, res) => {
    try {
        let result = await User.find({
            $or: [
                {
                    Fullname: { $regex: req.params.key },
                },
            ],
        });
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Fetch all users with weather data
const usersWithWeatherData = async (req, res) => {
    try {
        const users = await User.find().populate('WeatherData');
        res.json(users);
    } catch (error) {
        res.status(500).json({ status: "Error with fetching data", error: error.message });
    }
}

module.exports = {
    userRegister,
    loginUser,
    allUsers,
    updateUser,
    deleteUser,
    singleUser,
    searchUsers,
    usersWithWeatherData
};
