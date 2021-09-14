const Blog = require('../models/blog')

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('blogs/blogs', { blogs: result, title: 'blog' })
    })
    .catch(err => {
      console.log(err);
    })
}

const blog_details = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then(result => {
      result.map( article => { return  {title: article.title, snippet: artitle.snippet }})
      res.render('blogs/details', { blog: result, title: 'Blog Details' })
    })
    .catch(err => {
      console.log(err)
      res.render('404', { title: 'Blog not found' })
    })
}

const blog_create_get = (req, res) => {
  res.render('blogs/createPost', { title: 'Create a new blog' })
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body)
  const user = req

  blog.save()
    .then(result => {
      res.redirect('/blog')
    })
    .catch(err => {
      console.log(err)
    })
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blog' })
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
}