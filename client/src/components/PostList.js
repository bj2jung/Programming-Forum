import React, { useState } from "react";

function PostList() {
  // example post list. Actual list to be populated from database

  let listOfPosts = [
    {
      project: true,
      title: "Example project post",
      description: "Example description",
      skillTags: ["JavaScript", "HTML", "CSS"],
      status: "prototype",
      links: ["https://github.com"]
    },
    {
      project: false,
      title: "Example individual post",
      description: "Example description",
      skillTags: ["Java", "Ruby", "JavaScript"],
      links: ["https://github.com/bj2jung"]
    }
  ];

  const [postList] = useState(listOfPosts);

  return (
    <div>
      <ul>{postList[0].title}</ul>
      <ul>{postList[1].title}</ul>
    </div>
  );
}

export default PostList;
