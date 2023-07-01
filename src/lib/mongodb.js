import mongoose from 'mongoose'

const connectDB = async() => mongoose.connect("mongodb://localhost:27017/Tester",
  {
      maxPoolSize: 50, 
      wtimeoutMS: 2500,
      socketTimeoutMS: 360000,
      connectTimeoutMS: 360000,
      keepAlive: true
  })

export default connectDB