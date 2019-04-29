const mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  isProject: {
    type: boolean,
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
  }
});

module.exports = Post = PostSchema;
