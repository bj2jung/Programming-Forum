import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import FilterModal from "../components/FilterModal";

function PostList() {
  const GET_POSTLIST = gql`
    {
      posts {
        isProject
        _id
        title
        tags
      }
    }
  `;

  // const GET_FILTEREDPOSTLIST = gql`
  //   {
  //     postsFiltered(filterInput: { tags: ["HTML", "React"] }) {
  //       isProject
  //       _id
  //       title
  //       tags
  //     }
  //   }
  // `;

  const postStyle = {
    display: "inline"
  };

  const [postList, setPostList] = useState([]);

  return (
    <div>
      <FilterModal />
      <Query pollInterval={1000} query={GET_POSTLIST}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          if (data) {
            let list = data.posts.map(({ isProject, title, _id, tags }) => (
              <div key={_id}>
                <Link to={`/post/${_id}`}>
                  <h5 style={postStyle}>
                    {isProject ? "Project: " : "Individual: "}
                  </h5>
                  {title}
                  {tags.map(tag => (
                    <Badge key={tag} color="warning">
                      {tag}
                    </Badge>
                  ))}
                </Link>
              </div>
            ));

            return list;
          }
        }}
      </Query>
    </div>
  );
}

export default PostList;
