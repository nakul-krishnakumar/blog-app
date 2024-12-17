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

      try {
         const token = await User.matchPasswordAndGenerateToken(email, password);
         res.cookie("token", token);
         return res.status(202).redirect('/');
      } catch (error) {
         return res.render("signin", {
            error: "Incorrect Email or Password",
         }) 
      }
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
      
      return res.status(201).redirect('/');
   })

// ROUTE 3: /user/logout
router.route('/logout')
   .get((req, res) => {
      res.clearCookie('token');

      return res.status(200).render('home');
   })

module.exports = router;