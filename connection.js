const mongoose = require('mongoose');
const dotenv = require('dotenv')

const ENV = process.env.NODE_ENV || 'development';
dotenv.config({
  path: `${__dirname}/.env.${ENV}`
})

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
})

if (!process.env.MONGO_URL) {
  throw new Error('MONGO_URL not set')
}


function dropAndCreateTestDatabase() {
  if (process.env.NODE_ENV === 'test') {
    return mongoose.connection.dropDatabase()
      .then(() => {
        return mongoose.connection.db.createCollection('test-database');
      })
      .then(() => {
      })
  }
}

  dropAndCreateTestDatabase()

  const config = {};

  if (ENV === 'production') {
    config.connectionString = process.env.MONGO_URL
  }

  module.exports = {
    db: mongoose.connection,
    dropAndCreateTestDatabase,
  }
  
