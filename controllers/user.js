const User = require('../models/User');

const renderSignInPage = (req, res) => {
   return res.status(200).render('signin');
}

const authorizeAndSignInUser = async (req, res) => {
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
}

const renderSignUpPage = (req, res) => {
   return res.status(200).render('signup');
}

const createNewUserAndSignUp = async (req, res) => {
   const { fullName, email, password } = req.body;

   try {
      const user = await User.create({
         fullName: fullName,
         email: email,
         password: password
      });
   } catch (error) {
      return res.status(400).render('signup', {
         error: "Email already exists"
      })
   }
   
   return res.status(201).redirect('/');
}

const logOutUserAndClearToken = async (req, res) => {
   res.clearCookie('token');
   const allBlogs = await Blog.find({});
   return res.status(200).render('home', { blogs: allBlogs });
}

module.exports = {
   renderSignInPage,
   authorizeAndSignInUser,
   renderSignUpPage,
   createNewUserAndSignUp,
   logOutUserAndClearToken
}