import React, { useState, useEffect } from "react";
import { Query } from "react-apollo";
// import { useApolloClient } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import queryString from "query-string";
import { Button } from "reactstrap";

import FilterModal from "./FilterModal";
import PostRow from "./PostRow";

function PostList(props) {
  let tagFilterQueryArr = queryString.parse(props.filter, {
    arrayFormat: "comma"
  }).tags;

  if (!tagFilterQueryArr || tagFilterQueryArr === "") {
    tagFilterQueryArr = [];
  } else if (typeof tagFilterQueryArr === "string") {
    tagFilterQueryArr = [tagFilterQueryArr];
  }

  let isProjectQueryNum = queryString.parse(props.filter).isProject;
  if (isProjectQueryNum === undefined) {
    isProjectQueryNum = 0;
  }

  useEffect(() => {
    console.log(tagFilterQueryArr);
  });

  const LOAD_POSTS = gql`
    query($cursor: String, $show: Int, $isProject: Int, $tags: [String]) {
      loadPosts(
        cursor: $cursor
        show: $show
        filterInput: { isProject: $isProject, tags: $tags }
      ) {
        isProject
        _id
        title
        tags
        dateCreated
      }
    }
  `;
  ///
  const postsPerPage = 5;

  const historyStateObj = {
    numPosts: window.history.state.numPosts || postsPerPage
  };

  function handleLoadMorePosts() {
    historyStateObj.numPosts += postsPerPage;
    window.history.replaceState(historyStateObj, "");
  }

  function test() {
    window.history.replaceState({ numPosts: 50 }, "");
  }

  ///

  return (
    <div>
      <FilterModal
        currentIsProjectFilter={isProjectQueryNum}
        currentTagFilter={tagFilterQueryArr}
      />

      <Query
        // pollInterval={2000}
        query={LOAD_POSTS}
        variables={{
          isProject: Number(isProjectQueryNum),
          tags: tagFilterQueryArr,
          show: window.history.state.numPosts || postsPerPage,
          cursor: String(Date.now())
        }}
      >
        {({ loading, error, data, cursor, fetchMore, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          if (data.loadPosts) {
            const list = data.loadPosts.map(
              ({ isProject, title, _id, tags }) => (
                <PostRow
                  isProject={isProject}
                  title={title}
                  _id={_id}
                  key={_id}
                  tags={tags}
                />
              )
            );

            // set cursor to created time of last post in current list
            cursor = data.loadPosts[data.loadPosts.length - 1].dateCreated;

            list.push(
              <div>
                <Button
                  key="loadMore"
                  onClick={() => {
                    fetchMore({
                      query: LOAD_POSTS,
                      variables: {
                        cursor: String(cursor),
                        isProject: Number(isProjectQueryNum),
                        tags: tagFilterQueryArr,
                        show: postsPerPage
                      },

                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        const previousPosts = previousResult.loadPosts;
                        const newPosts = fetchMoreResult.loadPosts;
                        const newCursor = fetchMoreResult.cursor;

                        handleLoadMorePosts();

                        return {
                          cursor: newCursor,
                          loadPosts: [...previousPosts, ...newPosts],
                          __typename: previousPosts.__typename
                        };
                      }
                    });
                  }}
                >
                  Load More
                </Button>
                <Button
                  onClick={() => {
                    test();
                  }}
                >
                  Test function
                </Button>
                <Button>Test function 2</Button>
              </div>
            );

            return list;
          }
        }}
      </Query>
    </div>
  );
}

export default PostList;
