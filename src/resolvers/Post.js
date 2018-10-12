const Post = {
  // resolver method, is called for every post individually.
  author(parent, args, { db }, info) {
    return db.users.find(user => {
      // find is same as filter but looks for only one individual element!!
      // comes from the each post's actual data =>
      return user.id === parent.author;
    }); //  also parent.title or parent.body...
  },
  // filter all comments that match up witg given post.
  comments(parent, args, { db }, info) {
    return db.comments.filter(comment => {
      return comment.post === parent.id;
    });
  }
}

export { Post as default }