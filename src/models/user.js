const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
     name: {
        type: String,
        required: true,
        trim: true
     },
     email: {
        type: String, 
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

module.exports = User