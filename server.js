const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const pug = require('pug');

const authRoutes = require('./controllers/AuthController');

const server = http.createServer((req, res) => {


    // lodash

    const num = _.random(0, 20);
    console.log(num);

    const greed = _.once(() => {
        console.log('once');
    });


    app.set('view engine', 'ejs')

    res.setHeader('Content-Type', 'text/html');

    // send html file 

    let path = './views/';


    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            break;
        case '/about-me':
            path += 'about.html';
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile( path , (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            
            res.end(data);
        }
    })

});


server.listen(3000, 'localhost', (req, res) => {
    console.log('listen 3000');
});