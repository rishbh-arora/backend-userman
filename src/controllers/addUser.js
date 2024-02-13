const { User } = require("../models/model")

const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
    try {
      const checkPno = await User.find({phoneNumber:req.body.phoneNumber}).exec();
      if (checkPno.length != 0) {
        throw("Phone number already exists");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword
      });
      await user.save();
      res.status(201).send();
    } catch (error) {
      res.status(400).end(JSON.stringify({message:"Phone number already exists"}));
    }
  }