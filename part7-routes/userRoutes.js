const express = require('express');
const users = require('../part7-controller/userController');

const router = express.Router();
router.route('/').get(users.getAllUser).post(users.createUser);
router.route('/:id').get(users.getUser).patch(users.updateUser).delete(users.deleteUser);

module.exports = router;
