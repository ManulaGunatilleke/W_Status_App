const express = require("express");
const router = express.Router();
const authenticateRoleController = require('../controllers/authenticateRoleController');
const {isAdmin, isAdminORUser, isUser } = require('../middleware/authenticateRoleBase');

router.get('/admin', isAdmin, authenticateRoleController.adminRole);
router.get('/adminAndUser', isAdminORUser, authenticateRoleController.adminAndUserRole);
router.get('/user', isUser, authenticateRoleController.userRole);

module.exports = router;
