import connectDB from "@/lib/mongodb"

export const baseServices = {
  async connect() {
    await connectDB()
  }
}