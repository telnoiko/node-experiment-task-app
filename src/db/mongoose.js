const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'

mongoose.connect(connectionURL)

const User = mongoose.model('User', {
     name: {
        type: String
     },
     age: {
        type: Number
     }
})

const Task = mongoose.model('Task', {
    description: {
       type: String
    },
    completed: {
       type: Boolean
    }
})

const me = new User({
    name: 'K',
    age: 31
})

const task = new Task({
    description: 'Explore mongoose',
    completed: true
})

me.save()
.then(me => console.log(me))
.catch(error => console.log('Error!', error))

task.save()
.then(()  => console.log(task))
.catch(error => console.log('Error!', error))