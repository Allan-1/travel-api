const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/db');

const authrouter = express.Router();

// login routes
authrouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { id: user.id, name: user.username },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
});

// register routes
authrouter.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const user = await User.findOne({
    where: { username: username, email: email },
  });
  if (user) {
    res.status(409).json({ message: 'User already exists' });
  } else {
    // const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: newUser.id, name: newUser.username },
      process.env.JWT_SECRET
    );
    res.json({ token });
  }
});

module.exports = authrouter;
