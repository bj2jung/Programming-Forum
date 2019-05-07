const express = require("express");
const mongoose = require("mongoose");
const graphqlHTTP = require("express-graphql");

const schema = require("./server/graphql/schema/index");
const resolver = require("./server/graphql/resolvers/index");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const mongoURI =
  "mongodb+srv://brendon:12345@data-gp5tc.mongodb.net/Programming_Forum?retryWrites=true";

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
  })
);

const port = 4000;

mongoose
  .connect(`${mongoURI}`, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  })
  .catch(err => {
    console.log(err);
  });
