const Post = require("../../models/Post");
const User = require("../../models/User");

// const findUserId = userEmail => {
//   User.findOne({ email: userEmail }).then(user => {
//     // console.log(user._id);
//     return user._id;
//   });
// };

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

  // return details of a single post
  getPostDetails: args => {
    const postId = args.postId;

    return Post.findById(postId)
      .then(post => {
        return post;
      })
      .catch(err => console.log(err));
  },

  // create a post, save post in database, add post to user's createdPosts list
  createPost: args => {
    const post = new Post({
      isProject: args.postInput.isProject,
      title: args.postInput.title,
      description: args.postInput.description,
      links: args.postInput.links,
      tags: args.postInput.tags,
      dateCreated: new Date(args.postInput.dateCreated),
      viewCount: args.postInput.viewCount,
      responseCount: args.postInput.responseCount,
      creator: args.postInput.creator
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
