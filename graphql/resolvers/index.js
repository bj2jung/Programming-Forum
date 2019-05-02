const Post = require("../../models/Post");
const User = require("../../models/User");

// const user = userId => {
//   return User.findById(userId)
//     .then(user => {
//       return { ...user._doc };
//     })
//     .catch(err => {
//       throw err;
//     });
// };

const resolver = {
  // find all posts
  posts: () => {
    return Post.find()
      .then(post => {
        return post;
      })
      .catch(err => {
        throw err;
      });
  },

  // create a post, save post in database, add post to user's createdPosts list
  createPost: args => {
    const post = new Post({
      isProject: args.postInput.isProject,
      title: args.postInput.title,
      description: args.postInput.description,
      links: args.postInput.links,
      tags: args.postInput.tags,
      datePosted: new Date(args.postInput.datePosted),
      viewCount: args.postInput.viewCount,
      responseCount: args.postInput.responseCount,
      creator: "5cc8f6fb52acfa1194677238"
    });

    post
      .save()
      .then(() => {
        return User.findById(post.creator);
      })
      .then(user => {
        user.createdPosts.push(post);
        user.save();
      });
  },

  createUser: args => {
    const user = new User({
      email: args.userInput.email
      // password: args.userInput.password
    });
    return (
      user
        .save()
        // .populate("createdPosts")
        .then()
        .catch(err => console.log(err))
    );
  }
};

module.exports = resolver;
