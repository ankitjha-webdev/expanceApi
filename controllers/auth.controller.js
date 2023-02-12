const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // check if fields are empty
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Please fill all fields" });
  }
  
  const IsUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };
  try {
    // save user to database
    await User.create(IsUser);
    res.status(201).json({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;
    console.log(req.session.token);
    return res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signout = (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "Signout successfully",
    });
  } catch (error) {
    this.next(error);
  }
};
