const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;

// base url
app.get('/', (req, res) => {
   res.status(200).render('home')
})

app.listen(PORT, () => {
   console.log(`Server listening at ${process.env.HOST_URL}:${PORT}`)
})
