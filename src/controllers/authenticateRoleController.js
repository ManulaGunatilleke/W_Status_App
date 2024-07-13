const authenticateRoleController = {

    // Controller method for admin role
    adminRole: (req, res) => {
        res.status(200).json({ message: "Admin access granted" });
    },

    // Controller method for admin and user role
    adminAndUserRole: (req, res) => {
        res.status(200).json({ message: "Admin and User access granted" });
    },

    // Controller method for user role
    userRole: (req, res) => {
        res.status(200).json({ message: "User access granted" });
    }
};

module.exports = authenticateRoleController;
