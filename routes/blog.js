const { Router } = require('express');
const upload = require('../services/storeImage'); // multer
const Blog = require("../models/Blog");

const router = Router();

// ROUTE 1: /blog/add-new
router.route('/add-new')
   .get((req, res) => {
      return res.render('addBlog', {
         user: req.user,
      });
   })
   .post(upload.single("coverImage"), async (req, res) => {
      const { coverImage, title, body } = req.body;

      const blog = await Blog.create({
         title: title,
         body: body,
         coverImageURL: `/uploads/${req.file.filename}`,
         createdBy: req.user._id,
      })

      return res.redirect(`/blog/${blog._id}`);
   })

module.exports = router;