const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  isProject: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  links: {
    type: String
  },
  tags: {
    type: Array
  },
  datePosted: {
    type: Date,
    required: true
  },
  viewCount: {
    type: Number,
    required: true
  },
  responseCount: {
    type: Number,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = Post = mongoose.model("Post", PostSchema);
