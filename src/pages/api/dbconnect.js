import connectDB from '@/lib/connectDB'

export default function dbConnection(req, res){
  connectDB()
  res.status(200).json({DBresponse: 'Ыпызява'})
}