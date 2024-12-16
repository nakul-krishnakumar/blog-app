const express = require('express');
const path = require('path');
const connectToMongoDB = require('./conn');
require('dotenv').config();

const userRoute = require('./routes/user');

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
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;

// SUB ROUTES
app.use('/user', userRoute);

// base url
app.get('/', (req, res) => {
   res.status(200).render('home')
})

app.listen(PORT, () => {
   console.log(`Server listening at ${process.env.HOST_URL}:${PORT}`)
})
