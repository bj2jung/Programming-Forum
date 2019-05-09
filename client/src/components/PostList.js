import React, { useState, useEffect } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import queryString from "query-string";

import FilterModal from "../components/FilterModal";

function PostList() {
  let filterQueryArr = queryString.parse(window.location.search, {
    arrayFormat: "comma"
  }).filter;

  if (!filterQueryArr || filterQueryArr === "") {
    filterQueryArr = null;
  } else if (typeof filterQueryArr === "string") {
    filterQueryArr = [filterQueryArr];
  }

  const [tagFilterArr, setTagFilterArr] = useState(filterQueryArr);

  useEffect(() => {
    setTagFilterArr(filterQueryArr);
  }, [filterQueryArr]);

  const GET_ALL_POSTS = gql`
    query {
      posts {
        isProject
        _id
        title
        tags
      }
    }
  `;

  function createFilterQuery(isProject, tags) {
    let arrString = "";
    if (tags) {
      arrString = "[";
      tags.forEach(el => (arrString += '"' + el + '",'));
      arrString += "]";
    }

    return gql`
    query {
      postsFilteredByTags(filterInput: { tags: ${arrString} }) {
        isProject
        _id
        title
        tags
      }
    }
  `;
  }

  const postStyle = {
    display: "inline"
  };

  return (
    <div>
      <FilterModal />

      <Query
        pollInterval={1000}
        query={
          filterQueryArr ? createFilterQuery(true, tagFilterArr) : GET_ALL_POSTS
        }
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          if (data.posts) {
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

          if (data.postsFilteredByTags) {
            let list = data.postsFilteredByTags.map(
              ({ isProject, title, _id, tags }) => (
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
              )
            );

            return list;
          }
        }}
      </Query>
    </div>
  );
}

export default PostList;
