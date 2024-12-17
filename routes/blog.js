const { Router } = require('express');
const upload = require('../services/storeImage'); // multer
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

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

// ROUTE 2: /blog/:id
router.get(('/:id'), async (req, res) => {
   const id = req.params.id;
   const blog = await Blog.findById({ _id : id }).populate("createdBy");
   const comments = await Comment.find({ blogId: id}).populate("createdBy");

   console.log(comments);

   return res.render('viewBlog', {
      blog: blog,
      user: req.user,
      comments: comments
   });
})

// ROUTE 3: /blog/comment/:blogid
router.post(('/comment/:blogId'), async (req, res) => {

   console.log(req.body)
   console.log('param:', req.params.blogId);

   const comment = await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
   });

   console.log(comment);

   res.status(201).redirect(`/blog/${req.params.blogId}`);
})

module.exports = router;