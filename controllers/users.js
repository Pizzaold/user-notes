const bcrypt = require("bcrypt");
const User = require("../models/user");

const register = (req, res) => {
  console.log(req.body);
  User.findOne({
    where: { username: req.body.username },
  }).then((existingUser) => {
    if (existingUser) {
      return res.json({ message: "Username already exists" });
    }
    if (req.body.password.length < 8) {
      return res.json({ message: "Password must be at least 8 characters" });
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      }).then((registered) => {
        req.session.user = {
          username: registered.username,
          user_id: registered.id,
        };
        console.log(req.session);
        res.json({
          message: "User registered",
          user: registered,
          user_session: req.session.user,
        });
      });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        if (!result) {
          return res.status(401).json({ message: "Invalid password" });
        }
        req.session.user = {
          username: user.username,
          user_id: user.id,
        };
        console.log(req.session);
        res.json({
          message: "Login successful",
          user: user,
          user_session: req.session.user,
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to log in" });
    });
};

module.exports = { register, login };
