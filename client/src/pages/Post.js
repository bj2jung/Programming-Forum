import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Badge } from "reactstrap";

const Post = ({ match }) => {
  const GET_POST_DETAILS = gql`
    query {
      getPostDetails(postId: "${match.params.postId}") {
        isProject
        title
        description
        tags
        dateCreated
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
            <h5>{data.getPostDetails.isProject ? "Project" : "Individual"}</h5>
            <h3>{data.getPostDetails.title}</h3>
            <p>
              {data.getPostDetails.tags.map(tag => (
                <Badge key={tag} color="warning">
                  {tag}
                </Badge>
              ))}
            </p>
            <p>
              {new Date(Number(data.getPostDetails.dateCreated)).toDateString()}
            </p>
            <p>{data.getPostDetails.description}</p>
          </div>
        );
      }}
    </Query>
  );
};

export default Post;
