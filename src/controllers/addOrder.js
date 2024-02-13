const { Orders } = require("../models/model")

const addOrder = async (req, res) => {
  console.log("got an order")
    try {
      const newOrder = new Orders({
        user: req.user,
        item: req.body.item,
        quantity: req.body.quantity
      });
      console.log(newOrder.item);
      console.log(newOrder);
      await newOrder.save();
      res.status(201).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  module.exports = { addOrder }