const { buildSchema } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
const BOOk = require("../models/book.js");
const AUTHOR = require("../models/authr.js");
const User = require("../models/user.js");
const typeDefs = `
   type Query {
    books:[book]!
    authr(id:ID!):Authr
    aurths:[Authr]!
    book(id:ID!):book
    user:user
    login(email:String! password:String!): Authdata
    SignIn(email:String! password:String! username:String!):Authdata!
     
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

   type user {
     email: String!
     password: String!
     username :String!
   }

   type Authdata {
     token:String!
     userid:String! 
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
    },
    user: async (root, args, context, info) => {
      if (context.isAuth) {
        let found = await User.findById(context.userId);
        return found;
      } else {
        throw new Error("not authentication");
      }
    },
    login: async (root, args, context, info) => {
      if (args.password && args.email) {
        let founduser;
        try {
          founduser = await User.findOne({ email: args.email });
        } catch (error) {
          console.log(error);
        }
        if (founduser) {
          if (founduser.IsAuthenticate(args.password)) {
            let token = founduser.SignToken(founduser.email, founduser.id);
            return {
              userid: founduser.id,
              token,
            };
          } else {
            throw new Error("Wrong Password");
          }
        } else {
          throw new Error("no user found");
        }
      } else {
        throw new Error("no correct arguments");
      }
    },
    SignIn: async (root, args, context, info) => {
      if (args.password && args.email && args.username) {
        newuser = new User({ ...args });
        let saveduser = await newuser.save();
        return {
          token: saveduser.SignToken(saveduser.email, saveduser.id),
          userid: saveduser.id,
        };
      }
    },
  },
  // Relation  ============================
  book: {
    authr: (root, args, context, info) => {
      return AUTHOR.findById(root.authorid);
    },
  },
  Authr: {
    books: (root, args, context, info) => {
      return BOOk.find({ authorid: root.id });
    },
  },
};

schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
