const express = require("express");
const Schema = require("./schema/typeSchema.js"); //  or require("./schema/Schema.js") for the other Schema;
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const JWT = require("jsonwebtoken");
const User = require("./models/user.js");

const Authmiddlewar = function (req, res, next) {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = JWT.verify(token, "TOPSCERET");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.userId = decodedToken.userid;
  req.isAuth = true;
  next();
};

app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-nfrvc.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("connected DB");
});

app.use(
  "/graphql",
  Authmiddlewar,
  graphqlHTTP({
    schema,
    //  rootValue,
    graphiql: true,
  })
);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 400;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(5000, () => {
  console.log("the srever is listing on port 5000");
});
