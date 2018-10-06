import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// String, Boolean, Int, float, ID=> unique identifiers
//  <= Scalar types

// Demo user data
const users = [
  {
    id: '1',
    name: 'Riks',
    email: 'riks@mail.ee',
    age: 19
  },
  {
    id: '2',
    name: 'Aks',
    email: 'aks@mail.ee',
    age: 9
  },
  {
    id: '3',
    name: 'Art',
    email: 'art@mail.ee'
    //age: 48
  }
];

const posts = [
  {
    id: '1',
    title: 'Yee african people!!!',
    body: 'How are You?',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Yee european people!!!',
    body: 'How are You?',
    published: true,
    author: '2'
  },
  {
    id: '3',
    title: 'Yee american people!!!',
    body: 'How are You?',
    published: true,
    author: '2'
  }
];

const comments = [
  {
    id: '1',
    text: 'I Love This!',
    author: '1',
    post: '2'
  },
  {
    id: '2',
    text: 'I Admire This!',
    author: '2',
    post: '3'
  },
  {
    id: '3',
    text: 'I Hate This!',
    author: '2',
    post: '1'
  },
  {
    id: '4',
    text: "I Don't Care About This!",
    author: '3',
    post: '2'
  }
];

// Type definition (schema)
const typeDefs = `
  type Query {    
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!        
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;
// Resolvers
const resolvers = {
  Query: {
    // resolver query method to select individuals from the others.
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    // resolver query method to select depending to the looled for terms from the others.
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isBodyMatch || isTitleMatch;
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
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
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => {
        return user.email === args.email;
      });
      if (emailTaken) {
        throw new Error('Email taken');
      }
      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age
      };
      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author
      };
      posts.push(post);

      return post;
    }
  },
  Post: {
    // resolver method, is called for every post individually.
    author(parent, args, ctx, info) {
      return users.find(user => {
        // find is same as filter but looks for only one individual element!!
        // comes from the each post's actual data =>
        return user.id === parent.author;
      }); //  also parent.title or parent.body...
    },
    // filter all comments that match up witg given post.
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id; //comment.post is post's ID and parent
        // id the Post id (Object Post)
      });
    }
  },
  Comment: {
    // Set up an Object
    author(parent, args, ctx, info) {
      return users.find(user => {
        // given a comment return a correct author.
        return user.id === parent.author; // user's id matches with comment's author
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post; //matches with comment  post field?
      }); // parent is Comment.
    }
  },
  // Custom resolver function to teach GraphQL how get correct data.
  // When query for users relational with posts is made.
  User: {
    posts(parent, args, ctx, info) {
      // accesst to User via parent.
      return posts.filter(post => {
        return post.author === parent.id; // id in the type User object as parent.
      });
    },
    // Determine what comments belong to given user
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up!');
});
