const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
})

module.exports = mongoose.model('Profile', profileSchema)