import {Schema, model} from 'mongoose'
const mongoose = require('mongoose')
const usersModel = mongoose.model('users')

const usersSchema = new Schema({
  login: String,
  password: String,
  role: Boolean
})

const users = usersModel || model('users', usersSchema)
export default users