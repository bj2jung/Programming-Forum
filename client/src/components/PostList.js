import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

function PostList() {
  const GET_POSTLIST = gql`
    {
      posts {
        _id
        title
        tags
      }
    }
  `;

  return (
    <Query pollInterval={1000} query={GET_POSTLIST}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        if (data) {
          let whatever = data.posts.map(({ title, _id, tags }) => (
            <div key={_id}>
              <Link to={`/post/${_id}`}>
                {title}
                {tags.map(tag => (
                  <Badge key={tag} color="warning">
                    {tag}
                  </Badge>
                ))}
              </Link>
            </div>
          ));

          return whatever;
        }
      }}
    </Query>
  );
}

export default PostList;
