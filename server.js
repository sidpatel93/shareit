const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dbConnection = require('./db/db');
const fileRoutes = require('./routes/files') 
const showFileRoutes = require('./routes/show')
const path = require('path')
// Connection to DB
dbConnection();

// Configure the template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Initialize the routes
app.use('/api/files', fileRoutes)
app.use('/files', showFileRoutes)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})

