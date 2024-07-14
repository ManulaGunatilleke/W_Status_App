const Admin = require('../models/admin');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// Get all admin
const allAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ status: "Error with fetching data", error: error.message });
    }
}

module.exports = { allAdmins }
