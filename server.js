const express = require("express");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");

const app = express();
const port = 4000;

const mongoURI =
  "mongodb+srv://brendon:12345@data-gp5tc.mongodb.net/test?retryWrites=true";

mongoose.connect(`${mongoURI}`, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

// db.once("open", function() {
//   console.log("mongoDB connected");

// var kittySchema = new mongoose.Schema({
//   name: String
// });

// kittySchema.methods.speak = function() {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// };

// var Kitten = mongoose.model("Kitten", kittySchema);

// var silence = new Kitten({ name: "Silence" });

// var fluffy = new Kitten({ name: "Fluffy" });

// fluffy.save(function(err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak();
// });

// Kitten.find(function(err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// });
// });

// app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`App listening on port ${port}!`));
