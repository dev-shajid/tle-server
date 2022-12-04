const mongoose = require('mongoose')

const DATABASE_URL = "mongodb://localhost:27017/cf-bot" || process.env.DATABASE_URL

const connect = async () => {
  try {
    const res = await mongoose.connect(DATABASE_URL, { useNewURLParser: true, })

    console.log('🌱 Connected to MongoDB')

  } catch (error) {
    console.error(`MongoDB connection error: ${error}`,)
    process.exit(1)
  }
}

module.exports = connect