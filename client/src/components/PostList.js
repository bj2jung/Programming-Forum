import React, { useEffect } from "react";
import { Query } from "react-apollo";
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
    console.log("Effect function ran");
  });

  const LOAD_POSTS = gql`
    query($isProject: Int, $tags: [String]) {
      loadPostsInitial(filterInput: { isProject: $isProject, tags: $tags }) {
        isProject
        _id
        title
        tags
        dateCreated
      }
    }
  `;

  const LOAD_MORE_POSTS = gql`
    query($cursor: String, $isProject: Int, $tags: [String]) {
      loadMorePosts(
        cursor: $cursor
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
          tags: tagFilterQueryArr
        }}
      >
        {({ loading, error, data, cursor, fetchMore }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          if (data.loadPostsInitial) {
            const list = data.loadPostsInitial.map(
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
            cursor =
              data.loadPostsInitial[data.loadPostsInitial.length - 1]
                .dateCreated;

            list.push(
              <Button
                key="loadMore"
                onClick={() => {
                  fetchMore({
                    query: LOAD_MORE_POSTS,
                    variables: {
                      cursor: String(cursor),
                      isProject: Number(isProjectQueryNum),
                      tags: tagFilterQueryArr
                    },

                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const previousPosts = previousResult.loadPostsInitial;
                      const newPosts = fetchMoreResult.loadMorePosts;
                      const newCursor = fetchMoreResult.cursor;

                      return {
                        cursor: newCursor,
                        loadPostsInitial: [...previousPosts, ...newPosts],
                        __typename: previousPosts.__typename
                      };
                    }
                  });
                }}
              >
                Load More
              </Button>
            );

            return list;
          }
        }}
      </Query>
    </div>
  );
}

export default PostList;
