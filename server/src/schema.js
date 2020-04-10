const graphql = require("graphql");

const Listing = require("./listingsAndReviewsSchema");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const ListingType = new GraphQLObjectType({
  name: "Listing",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    summary: {
      type: GraphQLString,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    listing: {
      type: ListingType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Listing.findById(args.id);
      },
    },
    listings: {
      type: new GraphQLList(ListingType),
      resolve(parent, args) {
        return Listing.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
