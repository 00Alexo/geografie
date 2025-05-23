const express = require('express');
const { 
    signup,
    signin,
    getUserData
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/getUserData', getUserData);

module.exports = router;