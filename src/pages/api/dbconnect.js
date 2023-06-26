import connectDB from '@/lib/mongodb'

export default function dbConnection(req, res){
  connectDB()
  res.status(200).json({DBresponse: 'Ыпызява'})
}