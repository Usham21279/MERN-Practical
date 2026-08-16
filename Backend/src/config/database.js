import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    })
    console.log("PRACTICAL Database has been connected successfully.")
  } catch (error) {
    console.log("Database connection Error!!!", error)
  }
}

export { connect, mongoose };