const express = require('express');
const Blog = require('../models/blog');

const blogController = require('../controllers/BlogController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', requireAuth, blogController.blog_index);

router.post('/', blogController.blog_create_post);


router.get('/create-post', blogController.blog_create_get);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);





module.exports = router;