import {Schema, model} from 'mongoose'

const mongoose = require('mongoose')
const users = mongoose.model('users')

const usersSchema = new Schema({
  login: String,
  password: String,
  role: Boolean
})

const usersModel = users || model('users', usersSchema)
export default usersModel