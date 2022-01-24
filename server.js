const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dbConnection = require('./db/db');
const fileRoute = require('./routes/files') 
const showFileRoute = require('./routes/show')
const downloadFileRoute = require('./routes/download')
const path = require('path')
// Connection to DB
dbConnection();

app.use(express.static('public'))

// Configure the template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Initialize the routes
app.use('/api/files', fileRoute)
app.use('/files/download', downloadFileRoute )
app.use('/files', showFileRoute)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

