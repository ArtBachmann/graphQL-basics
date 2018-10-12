const User = {
  posts(parent, args, { db }, info) {
    // accesst to User via parent.
    return db.posts.filter(post => {
      return post.author === parent.id; // id in the type User object as parent.
    });
  },
  // Determine what comments belong to given user
  comments(parent, args, { db }, info) {
    return db.comments.filter(comment => {
      return comment.author === parent.id;
    });
  }
}

export { User as default }


