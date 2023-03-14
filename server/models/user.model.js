const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        userName: { type: String, required: true },
        password: { type: String, required: true },
        profilePicture: { type: String },
        verified: { type: Boolean, default: false }
    },
    { collection: 'user_admin' }
)

const model = mongoose.model('UserData', User)

module.exports = model