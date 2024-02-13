const { User, Orders } = require("../models/model")

exports.getOrders = async (req, res) => {
    const curorders = Orders.find({ user: req.user }).exec().then((data) => {
      res.json({
          orders:  data
      });
    }).catch(err => {
      console.log(err);
    });
  }