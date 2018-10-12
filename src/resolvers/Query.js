const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },

  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isBodyMatch || isTitleMatch;
    });
  },

  comments(parent, args, { db }, info) {
    return db.comments;
  },
  me() {
    return {
      id: '123sfg',
      name: 'Aks',
      email: 'aks@mail.ee',
      age: 9
    };
  },

  post() {
    // returns Post object
    return {
      id: '3344aa',
      title: 'You, African people!',
      body: 'allo, allo, allo',
      published: false
    };
  }
}

export { Query as default }