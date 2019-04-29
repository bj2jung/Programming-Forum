import React from "react";
import PostList from "./components/PostList";
import CreatePostModal from "./components/CreatePostModal";

function App() {
  return (
    <div>
      <CreatePostModal />
      <PostList />
    </div>
  );
}

export default App;
