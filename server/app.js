const express = require("express");

const schema = require("./schema/Schema.js");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-nfrvc.mongodb.net/test?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("connected DB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    //  rootValue,
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log("the srever is listing on port 5000");
});
