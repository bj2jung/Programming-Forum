import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

function PostList() {
  const GET_POSTLIST = gql`
    {
      posts {
        _id
        title
      }
    }
  `;

  return (
    <Query pollInterval={1000} query={GET_POSTLIST}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.posts.map(({ title, _id }) => (
          <div key={_id}>
            <Link to={`/post/${_id}`}>{title}</Link>
          </div>
        ));
      }}
    </Query>
  );
}

export default PostList;
