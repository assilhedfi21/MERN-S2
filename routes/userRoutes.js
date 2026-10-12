const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Définition des routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

// Exportation du routeur
module.exports = router;