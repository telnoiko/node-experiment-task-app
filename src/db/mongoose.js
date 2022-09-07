const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL)

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

const Task = mongoose.model('Task', {
    description: {
       type: String,
       required: true,
       trim: true
    },
    completed: {
       type: Boolean,
       default: false
    }
})

const me = new User({
    name: ' K    ',
    email: 'K@ABC.COM       ',
    password: "phone1234!"
})

const task = new Task({
    description: 'Explore mongoose   '
})

me.save()
.then(me => console.log(me))
.catch(error => console.log('Error!', error))

task.save()
.then(()  => console.log(task))
.catch(error => console.log('Error!', error))