import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

const postStyle = {
  display: "inline"
};

const PostRow = props => {
  return (
    <div>
      <Link to={`/post/${props._id}`}>
        <h5 style={postStyle}>
          {props.isProject ? "Project: " : "Individual: "}
        </h5>
        {props.title}
        {props.tags.map(tag => (
          <Badge key={tag} color="warning">
            {tag}
          </Badge>
        ))}
      </Link>
    </div>
  );
};

export default PostRow;
