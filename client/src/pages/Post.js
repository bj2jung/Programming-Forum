import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const Post = ({ match }) => {
  const GET_POST_DETAILS = gql`
    query {
      getPostDetails(postId: "${match.params.postId}") {
        title
        description
      }
    }
  `;

  return (
    <Query pollInterval={1000} query={GET_POST_DETAILS}>
      {({ loading, error, data }) => {
        if (loading) return <p />;
        if (error) return <p />;

        return (
          <div>
            <p>{data.getPostDetails.title}</p>
            <p>{data.getPostDetails.description}</p>
          </div>
        );
      }}
    </Query>
  );
};

export default Post;
