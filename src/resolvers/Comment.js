
const Comment = {
  // Set up an Object
  author(parent, args, { db }, info) {
    return db.users.find(user => {
      // given a comment return a correct author.
      return user.id === parent.author; // user's id matches with comment's author
    });
  },
  post(parent, args, { db }, info) {
    return db.posts.find(post => {
      return post.id === parent.post
    })
  }
}

export { Comment as default }
