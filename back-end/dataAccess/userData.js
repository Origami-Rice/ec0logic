const express = require('express')
const router = express.Router()

// Get all users
exports.get_user = () => router.get('/', async (req, res) => {
    try {
        //const users = await User.find()
        res.send('test')
    
    } catch {
        res.send('failed')

    }
})

module.exports = router