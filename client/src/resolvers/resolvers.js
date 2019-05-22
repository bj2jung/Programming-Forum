import { gql } from "apollo-boost";

export const typeDefs = gql`
  extend type Post {
    numPostsShown: Int
  }
`;

export const resolvers = {};
