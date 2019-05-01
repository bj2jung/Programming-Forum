const PostModel = require("./models/Post");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} = require("graphql");

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    isProject: { type: GraphQLBoolean },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    links: { type: GraphQLString },
    tags: { type: GraphQLString },
    datePosted: { type: GraphQLString },
    viewCount: { type: GraphQLInt },
    responseCount: { type: GraphQLInt },
    creator: { type: GraphQLString }
  })
});

// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     posts: {
//       type: new GraphQLList(PostType),
//       resolve(parent, args) {
//         return axios
//           .get("https://api.spacexdata.com/v3/launches/")
//           .then(res => res.data);
//       }
//     }
//   }
// });

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      Posts: {
        type: GraphQLList(PostType),
        resolve: (root, args, context, info) => {
          return PostModel.find();
        }
      }
      //   person: {
      //     type: PersonType,
      //     args: {
      //       id: { type: GraphQLNonNull(GraphQLID) }
      //     },
      //     resolve: (root, args, context, info) => {
      //       return PersonModel.findById(args.id).exec();
      //     }
      //   }
    }
  })
});

module.exports = schema;
