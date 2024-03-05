const express = require("express");
const sequelize = require("./utils/db");
const session = require("express-session");

const User = require("./models/user");
User.sync();

const Note = require("./models/notes");
Note.sync();

const app = express();

app.use(
  session({
    secret: "this is a secret",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const noteRoutes = require("./routes/notes");
app.use("/notes", noteRoutes);
app.use("/createNote", noteRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
