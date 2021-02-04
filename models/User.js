const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter an username'],
    unique: [true, 'Username already taken'], 
    lowercase: true,
  },
  fullName: {
    name: {
      type: String,      
    },
    surname: {
      type: String
    },

  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  schema_version: {type: String}
});


// static method for login user 

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if( auth ) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('imcorrect username');
};

userSchema.post('save',  function (doc, next) {
    console.log(this);
    next();
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;