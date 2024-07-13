const router = require("express").Router();
const {
    userRegister,
    loginUser,
    allUsers,
    updateUser,
    deleteUser,
    singleUser,
    searchUsers
} = require('../controllers/userController');

// Register a new user
router.post("/register", userRegister);

// Login a user
router.post("/login", loginUser);

// Get all the users
router.get("/", allUsers);

// Update a user
router.put("/update/:id", updateUser);

// Delete a single user
router.delete("/delete/:id", deleteUser);

// Get details of a single user
router.get("/get/:id", singleUser);

// search users
router.get("/search/:key", searchUsers);

module.exports = router;
