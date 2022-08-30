const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    user: { type: String, required: true},
    body: { type: String, required: true},
},
{ timestamps: true },
{collection: 'message'}
)

const messageModel = mongoose.model('Message',Message)

module.exports = messageModel