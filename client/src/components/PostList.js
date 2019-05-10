import React, { useState, useEffect } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import queryString from "query-string";

import FilterModal from "../components/FilterModal";

function PostList() {
  let tagFilterQueryArr = queryString.parse(window.location.search, {
    arrayFormat: "comma"
  }).tags;

  if (!tagFilterQueryArr || tagFilterQueryArr === "") {
    tagFilterQueryArr = [];
  } else if (typeof tagFilterQueryArr === "string") {
    tagFilterQueryArr = [tagFilterQueryArr];
  }

  let isProjectQueryNum = queryString.parse(window.location.search).isProject;
  if (isProjectQueryNum === undefined) {
    isProjectQueryNum = 0;
  }

  const [tagFilterArr, setTagFilterArr] = useState(tagFilterQueryArr);
  const [isProjectFilterNum, setIsProjectFilterNum] = useState(
    isProjectQueryNum
  );

  useEffect(() => {
    setTagFilterArr(tagFilterQueryArr);
    setIsProjectFilterNum(isProjectQueryNum);
  }, [tagFilterQueryArr, isProjectQueryNum]);

  function createFilterQuery(isProject, tags) {
    let arrString = "";
    if (tags) {
      arrString = "[";
      tags.forEach(el => (arrString += '"' + el + '",'));
      arrString += "]";
    }

    return gql`
    query {
      postsFilteredByTags(filterInput: { isProject:${isProject}, tags: ${arrString} }) {
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
      <FilterModal
        currentIsProjectFilter={isProjectFilterNum}
        currentTagFilter={tagFilterArr}
      />

      <Query
        pollInterval={2000}
        query={createFilterQuery(isProjectFilterNum, tagFilterArr)}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

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
