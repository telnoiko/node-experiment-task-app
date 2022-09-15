const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
       trim: true
    },
    email: {
       type: String, 
       unique: true,
       required: true, 
       trim: true,
       lowercase: true,
       validate(value) {
           if (!validator.isEmail(value)) {
               throw new Error('Email is not valid!')
           }
       }
    },
    password: {
       type: String, 
       required: true,
       trim: true, 
       minLength: 7,
       validate(value) {
           if(validator.contains(value, 'password', {ignoreCase: true})) {
               throw new Error('Passwrod cannot contain the word "password"!')
           }
       }
    },
    age: {
       type: Number,
       default: 0,
       validate(value) {
           if (value < 0) {
               throw new Error('Age must be a positive number')
           }
       }
    }
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login.')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login.')
    }

    return user;
}

userSchema.pre('save', async function(next) {
    const user = this
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User