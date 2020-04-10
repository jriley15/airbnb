const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongo = require("mongoose");
const app = express();
const config = require("../config.json");

mongo.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongo.connection.once("open", async () => {
  console.log("connected to database");
});

app.use(
  `/graphiql`,
  graphqlHTTP({ schema: require(`./schema.js`), graphiql: true })
);

app.use("/graphql", graphqlHTTP({ schema: require(`./schema.js`) }));

app.listen(8080, () => {
  console.log("Server running succefully...");
});
