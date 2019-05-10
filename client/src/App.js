import React from "react";
import Home from "./pages/Home";
import Post from "./pages/Post";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:filter" component={Home} />
        <Route exact path="/post/:postId" component={Post} />
      </Switch>
    </div>
  );
}

export default App;
