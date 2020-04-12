const express = require("express");
const mongo = require("mongoose");
const app = express();
const config = require("../config.json");
const { ApolloServer, gql } = require("apollo-server-express");
const Listing = require("./listingsAndReviewsSchema");
var cors = require("cors");

mongo.connect(config.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongo.connection.once("open", async () => {
  console.log("connected to database");
});

const typeDefs = gql`
  type Query {
    listing(id: ID, name: String): [Listing]
  }
  type Listing {
    id: ID
    name: String
    summary: String
    listing_url: String
    space: String
    description: String
  }
`;

const resolvers = {
  Query: {
    listing: (parent, args, context, info) => Listing.find(args),
  },
};

app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(8080, () => {
  console.log("Server running succefully...");
});
