const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


const { requireAuth, checkUser } = require('./middleware/authMiddleware');
 
const Blog = require('./models/blog');

const mongoose = require('mongoose');
const { render } = require('pug');

// Routers

const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

// connect mongodb
const dbURL = 'mongodb+srv://danabek:danabek@cluster0.mtzj8.mongodb.net/learning?retryWrites=true&w=majority';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( (result) => {  app.listen(process.env.PORT); }  )
    .catch( (err) => console.log(err) );

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.get('*', checkUser);

app.get('/', (req, res) => {
    res.render('index', { title: 'home'});
});

app.get('/profile', requireAuth,  (req, res) => {
    res.render('profile', {title: 'profile'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'about'});
});

// blogs routes

app.use('/blogs',  blogRoutes);

// cookies

app.get('/set-cookie', (req, res) => {
    res.cookie('newUser', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});

    res.send('you got cookie');
});

app.get('/read-cookie', (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);

    res.json(cookie);
});

app.use(authRoutes);

app.use( (req, res) => {
    res.status(404).render('404', {title: '404 Not found'});
});