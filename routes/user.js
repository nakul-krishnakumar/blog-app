const { Router } = require('express');
const User = require('../models/User');

const router = Router();

// ROUTE 1: /user/signin
router.route('/signin')
   .get((req, res) => {
      return res.status(200).render('signin');
   })
   .post(async (req, res) => {
      const { email, password } = req.body;
      const user = User.matchPassword(email, password)
      return res.status(202).redirect('/');
   })


// ROUTE 2: /user/signup
router.route('/signup')
   .get((req, res) => {
      return res.status(200).render('signup');
   })
   .post(async (req, res) => {
      const { fullName, email, password } = req.body;

      const user = await User.create({
         fullName: fullName,
         email: email,
         password: password
      });

      console.log(user)
      
      return res.status(201).redirect('/');
   })

module.exports = router;