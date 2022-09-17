const jwt = require('jsonwebtoken')
const User = require('../models/user')

 const auth = async (req, resp, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismysecret')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (e) {
        resp.status(401).send({error: 'Unable to authenticate'})
    }
}

module.exports = auth