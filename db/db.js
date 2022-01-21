const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = () => {
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('DB connected !!')
  })
}

module.exports = dbConnection;