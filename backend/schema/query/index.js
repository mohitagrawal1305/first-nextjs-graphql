const { BookType, AuthorType, UserType } = require( '../types' );

const graphql = require( 'graphql' );
const Book = require( '../../models/Book' );
const Author = require( '../../models/Author' );
const User = require( '../../models/User' );
const jwt = require( 'jsonwebtoken' );

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
} = graphql;

const RootQuery = new GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            async resolve( parent, args ) {

                const book = await Book.findById( args.id );
                return book;
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            async resolve( parent, args ) {
                
                const author = await Author.findById( args.id );
                return author;
            }
        },
        books: {
            type: new GraphQLList( BookType ),
            resolve( parent, args ) {
                return Book.find();
            }
        },
        authors: {
            type: new GraphQLList( AuthorType ),
            resolve( parent, args ) {
                return Author.find();
            }
        },
        user: {
            type:UserType,
            async resolve( parent, args, request ) {
                const { authorization } = request.headers;
                
                if( authorization ) {
                    
                    const { user } = jwt.verify( authorization, 'mySecretToken' );

                    const _user = await User.findById( user.id );
                    
                    return _user;
                }
            }
        }
    }
} );

module.exports = RootQuery;