// CRUD
const { MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // CREATE
    db.collection('users').insertOne({
        name: 'K',
        location: 'Georgia'
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }
        console.log(result)
    })

    db.collection('users').insertMany([
        {
            name: 'L',
            location: 'Montenegro'
        },{
            name: 'M',
            location: 'Croatia'
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert users')
        }
        console.log(result)
    })

    db.collection('tasks').insertMany([
        {
            description: 'add tasks collection',
            completed: true
        },{
            description: 'push code to github',
            completed: false
        },{
            description: 'clean up the code',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks ')
        }
        console.log(result)
    })

    // READ
    db.collection("users").findOne({ name: 'K', age: 1 }, (error, user) => {
        if (error){
            console.log('Unable to fetch user')
        }
        console.log(user)
    })

    db.collection("users").findOne({ _id: new ObjectId('6315be521465374d336e7ba2') }, (error, user) => {
        if (error){
            console.log('Unable to fetch user')
        }
        console.log(user)
    })

    db.collection("tasks").find({ completed: false }).toArray((error, users) => {
        if (error){
            console.log('Unable to fetch user')
        }
        console.log(users)
    })

    db.collection("tasks").countDocuments({completed: false}, (error, count) => {
        if (error){
            console.log('Unable to count users')
        }
        console.log(count)
    })

    // UPDATE
    db.collection("users").updateOne({
        _id: new ObjectId("63160f6ae2404a1269916af1")
    }, {
        $set: {
            name: 'J'
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log(error))

    db.collection("tasks").updateMany({
        completed: false
    }, {
        $set: {
            completed: true 
        }
    })
    .then(result => console.log(result))
    .catch(error => console.log(error))

    // DELETE
    db.collection("tasks").deleteMany({
        completed: false
    })
    .then(result => console.log(result))
    .catch(error => console.log(error))
})