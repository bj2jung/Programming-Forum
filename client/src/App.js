import React from "react";
import Home from "./pages/Home";
import Post from "./pages/Post";

import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/:filter" component={Home} />
          <Route exact path="/post/:postId" component={Post} />
          <Redirect from="*" to="/home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
