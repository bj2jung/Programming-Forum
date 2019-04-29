const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType"
});

module.exports = new GraphQLSchema({});
