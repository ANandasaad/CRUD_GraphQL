import gql from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
  }

  input UserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality
  }
  input UpdateUser {
    id: ID!
    newUsername: String!
  }
  
  
  type Mutation {
    createUser(input: UserInput!): User
    updateUsername(input: UpdateUser!): User
    deleteUser(id:ID!):User
  }
`;
export default typeDefs;
