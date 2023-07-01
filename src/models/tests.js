import {Schema, model} from 'mongoose'
const mongoose = require('mongoose')
const testsModel = mongoose.model('tests')

const testsSchema = new Schema({
  name: String,
  type: Boolean,
  owner: String,
  questions: [{
    id: Number,
    textQ: String,
    answers: [{
      id: Number,
      textA: String,
      state: Boolean 
    }]
  }]
})

const tests = testsModel || model('tests', testsSchema)
export default tests