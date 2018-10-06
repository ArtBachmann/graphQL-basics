import { GraphQLServer } from 'graphql-yoga';

// String, Boolean, Int, float, ID=> unique identifiers
//  <= Scalar types

// Type definition

const typeDefs = `
  type Query {
    add(numbers: [Float!]!): Float!
    greeting(name: String, position: String): String!
    grades: [Int!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`
// Resolvers

const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0
      }
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      })
    },
    greeting(parent, args) {
      if (args.name && args.position) {
        return `Hello ${args.name}, You are the most futuristic ${args.position} !!!`
      }
      else {
        return 'Hello!'
      }
    },
    grades(parent, args, ctx, info) {
      return [77, 88, 99]
    },
    me() {
      return {
        id: '123sfg',
        name: 'Aks',
        email: 'aks@mail.ee',
        age: 9
      }
    },
    post() {
      return {
        id: '3344aa',
        title: 'You, African people!',
        body: 'allo, allo, allo',
        published: false
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})