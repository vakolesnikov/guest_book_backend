const {Schema, model} = require('mongoose')


const Post = new Schema({
    creatingDate: {type: Number, required: true},
    userId: {type: String, required: true},
    messageText: {type: String, required: true},
    userName: {type: String, required: true},
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
})

module.exports = model('Post', Post)