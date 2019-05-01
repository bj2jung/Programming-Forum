const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  //   password: {
  //     type: String,
  //     required: true
  //   },
  createdPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

module.exports = User = mongoose.model("User", UserSchema);
