const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', username: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    } 

    // incorrect email 
    if (err.message === 'incorrect email') {
        errors.email = 'that email is already registered';
    }
    
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect';
    } 

  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;

};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
 return jwt.sign( {id}, 'fran bow' , {
     expiresIn: maxAge
 });
};

module.exports.signup_get = (req, res) => {
    res.render('signup', {title: 'Sign up'});
};

module.exports.login_get = (req, res) => {
    res.render('login', {title: 'Log in'});
};

module.exports.signup_post = async (req, res) => {
    const { email, password, username, name, surname } = req.body;

    console.log("POST", email);

    try {
      const user = await User.create({ email, password, username, name, surname, schema_version: "2" });
      const token = createToken(user._id);

      res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});

      res.status(201).json({ user: user._id});
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }

};

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ user: user._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }

};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).redirect('/');
};
