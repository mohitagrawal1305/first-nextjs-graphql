const graphql = require( 'graphql' );
const Author = require( '../models/Author' );
const Book = require( '../models/Book' );
const User = require( '../models/User' );

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const BookType = new GraphQLObjectType( {
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            async resolve( parent, args ) {
                const author = await Author.findById( parent.authorId );
                return author;
            }
        }
    })
} );

const AuthorType = new GraphQLObjectType( {
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList( BookType ),
            async resolve( parent, args ) {

                const book = await Book.find( { authorId: parent.id } );

                return book;

            }
        }
    })
} );

const LoginType = new GraphQLObjectType( {
    name: 'Login',
    fields:{
        token: {
            type: GraphQLString
        },
        msg: {
            type: GraphQLString
        }
    }
} );

const UserType = new GraphQLObjectType( {
    name: 'User',
    fields:{
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        
        avatar: {
            type: GraphQLString
        }
    }
} );

module.exports = { AuthorType, BookType, LoginType, UserType };