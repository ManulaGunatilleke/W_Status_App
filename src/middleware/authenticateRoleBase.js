const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "Your_Secret_Token");
        if (decodedToken.type === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an admin" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

const isUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "Your_Secret_Token");
        if (decodedToken.type === 'user') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not a user" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

const isAdminORUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "Your_Secret_Token");
        if (decodedToken.type === 'admin' || decodedToken.type === 'user') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an admin or user" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

module.exports = {
    isAdmin,
    isUser,
    isAdminORUser
};
