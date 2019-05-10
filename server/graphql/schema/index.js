const { buildSchema } = require("graphql");

module.exports = schema = buildSchema(`
      type Post {
        _id: ID!
        isProject: Boolean!
        title: String!
        description: String!
        links: String
        tags: [String]
        dateCreated: String!
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
        postsFilteredByTags(filterInput: FilterInput): [Post]
        getPostDetails(postId: String): Post
      } 
      
      input PostInput {
        isProject: Boolean!
        title: String!
        description: String!
        links: String
        tags: [String]
        dateCreated: String!
        viewCount: Int!
        responseCount: Int!
        creator: String!
      }

      input FilterInput {
        isProject: Int
        tags: [String]
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
