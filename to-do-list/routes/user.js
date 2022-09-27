const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('', userController.home);
router.get('/profile', userController.profile);

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);

// use passport as a middleware to authenticate

router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), userController.createSession);

module.exports = router;