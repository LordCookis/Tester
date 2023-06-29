import connectDB from '@/lib/mongodb'

export default function dbConnect(req, res){
  connectDB()
  res.status(200).json({DBresponse: 'Ыпызява'})
}