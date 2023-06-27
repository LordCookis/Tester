import connectDB from "@/lib/connectDB"

export const baseServices = {
  async connect() {
    await connectDB()
  }
}