const { buildSchema } = require("graphql");

module.exports = schema = buildSchema(`
      type Post {
        _id: ID!
        isProject: Boolean!
        title: String!
        description: String!
        links: String
        tags: String
        datePosted: String!
        viewCount: Int!
        responseCount: Int!
        creator: User!
      }

      type User {
        _id: ID!
        email: String!
        password: String
        createdPosts: [Post!]
      }

      type RootQuery{
        posts: [Post]
      } 
      
      input PostInput {
        isProject: Boolean!
        title: String!
        description: String!
        links: String
        tags: String
        datePosted: String!
        viewCount: Int!
        responseCount: Int!
        creator: String!
      }

      input UserInput {
        email: String!
      }

      type RootMutation{
        createPost(postInput: PostInput): Post
        createUser(userInput: UserInput): User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `);
