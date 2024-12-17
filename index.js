require('dotenv').config();

const express = require('express');
const path = require('path');
const connectToMongoDB = require('./conn');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const Blog = require("./models/Blog");

const app = express();

// CONNECT TO DATABASE
connectToMongoDB(process.env.DB_URL)
   .then(() => {
      console.log("Sucessfully Connect to Mongo DB");
   })
   .catch((e) => {
      console.log("Error connecting to DB: ", e);
   })

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

const PORT = process.env.PORT || 8080;

// SUB ROUTES
app.use('/user', userRoute);
app.use('/blog', blogRoute);

// base url
app.get('/', async (req, res) => {
   const allBlogs = await Blog.find({});
   return res.status(200).render('home', {
      user: req.user,
      blogs: allBlogs
   });
})

app.listen(PORT, () => {
   console.log(`Server listening at PORT: ${PORT}`)
})
