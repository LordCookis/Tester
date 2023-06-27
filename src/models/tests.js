import {Schema, model} from 'mongoose'

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

const tests = model('Tests', testsSchema)
export default tests