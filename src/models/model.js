const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    password: String
  });

const User = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    item: String,
    quantity: {
      type: Number,
      integer: true
    }
  });

const Orders = mongoose.model('Orders', orderSchema);

module.exports = { User,  Orders};
