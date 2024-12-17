const { Router } = require('express');
const { renderSignInPage, authorizeAndSignInUser, renderSignUpPage, createNewUserAndSignUp, logOutUserAndClearToken } = require('../controllers/user');

const router = Router();

// ROUTE 1: /user/signin
router.route('/signin')
   .get(renderSignInPage)
   .post(authorizeAndSignInUser);

// ROUTE 2: /user/signup
router.route('/signup') 
   .get(renderSignUpPage)
   .post(createNewUserAndSignUp);

// ROUTE 3: /user/logout
router.get('/logout', logOutUserAndClearToken);

module.exports = router;