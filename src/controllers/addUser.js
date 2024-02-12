const User = require("../models/models")

const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword
      });
      await user.save();
      res.status(201).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }