const graphql = require("graphql");

const BOOk = require("../models/book.js");
const AUTHOR = require("../models/authr.js");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const _ = require("lodash");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authr: {
      type: AuthrType,
      resolve(parent, args) {
        //console.log(parent);
        return AUTHOR.findById(parent.authorid);
      }
    }
  })
});

const AuthrType = new GraphQLObjectType({
  name: "Authr",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return BOOk.find({ authorid: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //console.log(args.id);
        return BOOk.findById(args.id);
      }
    },
    authr: {
      type: AuthrType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return AUTHOR.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return BOOk.find({});
      }
    },
    aurths: {
      type: new GraphQLList(AuthrType),
      resolve(parent, args) {
        return AUTHOR.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthrType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        //console.log(args);

        let auth = new AUTHOR({
          name: args.name,
          age: args.age
        });

        return auth.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorid: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new BOOk({
          name: args.name,
          genre: args.genre,
          authorid: args.authorid
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
