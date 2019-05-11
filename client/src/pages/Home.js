import React from "react";

import PostList from "../components/PostList";
import CreatePostModal from "../components/CreatePostModal";

const Home = ({ match }) => {
  return (
    <div>
      <CreatePostModal />
      <PostList filter={match.params.filter} />
    </div>
  );
};

export default Home;
