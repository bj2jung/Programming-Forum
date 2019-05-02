import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

function PostList() {
  const GET_POSTS = gql`
    {
      posts {
        _id
        title
      }
    }
  `;

  return (
    <Query pollInterval={1000} query={GET_POSTS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.posts.map(({ title, _id }) => (
          <div key={_id}>
            <p>{title}</p>
          </div>
        ));
      }}
    </Query>
  );
}

export default PostList;
