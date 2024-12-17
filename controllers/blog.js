const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');

const renderAddBlogPage = (req, res) => {
   return res.render('addBlog', {
      user: req.user,
   });
}

const createNewBlog = async (req, res) => {
   const { coverImage, title, body } = req.body;

   const blog = await Blog.create({
      title: title,
      body: body,
      coverImageURL: `/uploads/${req.file.filename}`,
      createdBy: req.user._id,
   })

   return res.redirect(`/blog/${blog._id}`);
}

const viewABlog = async (req, res) => {
   const id = req.params.id;
   const blog = await Blog.findById({ _id : id }).populate("createdBy");
   const comments = await Comment.find({ blogId: id}).populate("createdBy"); 
   // see comments too

   return res.render('viewBlog', {
      blog: blog,
      user: req.user,
      comments: comments
   });
}

const postAComment = async (req, res) => {
   const comment = await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
   });

   res.status(201).redirect(`/blog/${req.params.blogId}`);
}

module.exports = {
   createNewBlog,
   renderAddBlogPage,
   viewABlog,
   postAComment
}