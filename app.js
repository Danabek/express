const express = require('express');
const morgan = require('morgan');
 
const Blog = require('./models/blog');

const mongoose = require('mongoose');



const app = express();


// connect mongodb
const dbURL = 'mongodb+srv://danabek:danabek@cluster0.mtzj8.mongodb.net/learning?retryWrites=true&w=majority';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( (result) => {  app.listen(3000); }  )
    .catch( (err) => console.log(err) );



app.set('view engine', 'ejs');

const blogs = [
    { title: "Next.js", snippet: "Learn server side rendering"},
    { title: "React.js", snippet: "Create your first SPA"},
    { title: "Chattish", snippet: "Minimalistic chat"},
    { title: "Burnoe", snippet: "Where id begun yup"},
];


// sandbox
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'new blog about',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then( (result) => {
//             res.send(result);
//         })
//         .catch( (err) => {
//             console.log(err);
//         });

// });


// app.get( '/all-blog', (req, res) => {
//     Blog.find()
//         .then( (result) => res.send(result) )
//         .catch(err => console.log(err));
// });

// app.get( '/find-blog', (req, res) => {
//     Blog.findById('5f76fc5589155038973754e3')
//         .then( (result) => res.send(result) )
//         .catch(err => console.log(err));
// } );



app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.render('index', {blogs, title: 'home'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'about'});
});

// blogs routes

app.get('/blogs', (req, res) => {
    Blog.find().sort( { createdAt: -1 } )
        .then( (result) => {
            res.render( 'blogs/blogs', { title: 'All blogs', blogs: result } );
        })
        .catch( (err) => {
            console.log(err);
        });
})

app.get('/blogs/create-post', (req, res) => {
    res.render('createPost', {title: 'New Post'});
});

app.post('./blogs', (req, res) => {
    console.log(req.body)
    
});

app.use( (req, res) => {
    res.status(404).render('404', {title: '404 Not found'});

});