const { User } = require("../models/model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (user === null) {
      return res.status(400).send('Cannot find user');
    }
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({
            accessToken: accessToken,
            userID: user.id
        });
      } else {
        res.status(401).send('Invalid password');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }