// CRUD
const { MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const objectId = new ObjectId()
console.log(objectId.id.length)
console.log(objectId.toHexString().length)
console.log(objectId.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // Create
    // db.collection('users').insertOne({
    //     name: 'K',
    //     location: 'Georgia'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'L',
    //         location: 'Montenegro'
    //     },{
    //         name: 'M',
    //         location: 'Croatia'
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert users')
    //     }
    //     console.log(result)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'add tasks collection',
    //         completed: true
    //     },{
    //         description: 'push code to github',
    //         completed: 'false'
    //     },{
    //         description: 'clean up the code',
    //         completed: 'false'
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks ')
    //     }
    //     console.log(result)
    // })
})