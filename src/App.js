require('dotenv').config()
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { authenticateToken } = require('./middleware/authenticateToken');
const { addUser }  = require("./controllers/addUser");
const { login } = require('./controllers/loginUser');
const { getOrders } = require('./controllers/getorders');
const { addOrder } = require('./controllers/addOrder');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});


// Routes
app.get('/test', (req,res) => {
  console.log("tested");
  res.json({
    message: "hello world"
  })
});
app.post('/add-user', (req, res) => addUser(req, res));
app.post('/login-user', (req, res) => login(req, res));

app.use(authenticateToken);
app.post('/add-order', (req, res) => addOrder(req,res));

app.get('/get-order', (req, res) => getOrders(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});