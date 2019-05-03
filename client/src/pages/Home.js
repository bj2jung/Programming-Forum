import React from "react";

import PostList from "../components/PostList";
import CreatePostModal from "../components/CreatePostModal";

function Home() {
  return (
    <div>
      <CreatePostModal />
      <PostList />
    </div>
  );
}

export default Home;
