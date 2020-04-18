const { buildSchema } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
const BOOk = require("../models/book.js");
const AUTHOR = require("../models/authr.js");

const typeDefs = `
   type Query {
    books:[book]!
    authr(id:ID!):Authr
    aurths:[Authr]!
    book(id:ID!):book

  }
    type Authr{
    id:ID!
    name:String!
    age:Int!
    books:[book]
    }
 
   type book {
    id:ID!
    name:String!
    genre:String!
    authr:Authr
   }   
    
`;

const resolvers = {
  Query: {
    books: (root, args, context, info) => {
      return BOOk.find({});
    },
    authr: (root, args, context, info) => {
      return AUTHOR.findById(args.id);
    },
    aurths: () => {
      return AUTHOR.find({});
    },
    book: (root, args, context, info) => {
      return BOOk.findById(args.id);
    }
  },
  book: {
    authr: (root, args, context, info) => {
      console.log(root);
      return AUTHOR.findById(root.authorid);
    }
  },
  Authr: {
    books: (root, args, context, info) => {
      console.log(root);
      return BOOk.find({ authorid: root.id });
    }
  }
};

schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
