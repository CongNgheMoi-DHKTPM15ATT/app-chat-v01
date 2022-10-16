const asyncHandler = require('express-async-handler');
const User = require('./../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserResponse = require('./../responses/userResponse');


const authController = {
  register: asyncHandler(async (req, res) => {
    try {

      const { user_name, password, email, phone } = req.body;
      console.log(email);
      const passwordEncoded = await bcrypt.hash(password, await bcrypt.genSalt(10))
      const createUser = new User({ user_name, email, phone, 'password': passwordEncoded, })

      const newUser = await createUser.save();

      if (newUser) {
        res.status(201).json({
          'mess': 'create sucess',
        })
      } else {
        res.status(400).json({
          'mess': 'fail create'
        })
      }
    } catch (err) {
      console.log(err);
    }
  }),
  login: asyncHandler(async (req, res) => {
    const { user_name, password } = req.body;
    const user_document = await User.findOne({ user_name });
    if (user_document) {
      const validPassword = await bcrypt.compare(password, user_document.password);
      if (validPassword) {
        const token = jwt.sign({ user_name, password: user_document.password }, process.env.JWT_SECRET_KEY)
        console.log(token);


        res.status(200).json({ message: "Sign in sucess", token: token, data: new UserResponse(user_document).custom() });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  }),
  logout: asyncHandler(async (req, res) => {

  }),
}

module.exports = authController;