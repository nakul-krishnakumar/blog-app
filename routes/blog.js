const { Router } = require('express');
const upload = require('../services/storeImage'); // multer
const { 
   createNewBlog, 
   renderAddBlogPage, 
   viewABlog, 
   postAComment
} = require('../controllers/blog');

const router = Router();

// ROUTE 1: /blog/add-new
router.route('/add-new')                                        
   .get(renderAddBlogPage)
   .post(upload.single("coverImage"), createNewBlog);

// ROUTE 2: /blog/:id
router.get(('/:id'), viewABlog);  

// ROUTE 3: /blog/comment/:blogid
router.post(('/comment/:blogId'), postAComment);                

module.exports = router;