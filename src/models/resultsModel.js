import {Schema, model} from 'mongoose'

const mongoose = require('mongoose')
const results = mongoose.model('results')

const resultsSchema = new Schema({
  login: String,
  trueAnswers: Number,
  countAnswers: Number,
  owner: String,
  testId: String,
  testName: String,
  date: {
    type: Date,
    default: Date.now
  }
})

const resultsModel = results || model('results', resultsSchema)
export default resultsModel