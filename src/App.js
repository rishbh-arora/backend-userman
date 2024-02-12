require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { authenticateToken } = require('./middleware/authenticateToken');
const { addUser }  = require("./controllers/addUser");
const { login } = require('./controllers/loginUser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});


// Routes
app.post('/add-user', (req, res) => addUser(req, res));
app.post('/login-user', (req, res) => login(req, res));

app.use(authenticateToken);

app.post('/add-order', (req, res) => {
  // Add code to add new order
});

app.get('/get-order', (req, res) => {
  // Add code to get order details
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});