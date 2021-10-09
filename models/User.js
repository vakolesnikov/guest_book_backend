const {Schema, model} = require('mongoose')


const User = new Schema({
    userName: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true,},
    lastName: {type: String, required: true,},
    email: {type: String, required: false},
    phone: {type: String, required: false},
    age: {type: String, required: false},
    work: {type: String, required: false},

})

module.exports = model('User', User)