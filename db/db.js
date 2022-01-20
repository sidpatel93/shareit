const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('DB connected !!')
  }).catch(e => console.log("DB connection failed"))
}

module.exports = dbConnection;