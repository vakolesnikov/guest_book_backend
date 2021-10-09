const mongoose = require('mongoose');
const {PostSchema, UserSchema} = require('./schemas')


const UserModel = mongoose.model('user', UserSchema);
const PostModel = mongoose.model('post', PostSchema);

module.exports = {UserModel, PostModel};