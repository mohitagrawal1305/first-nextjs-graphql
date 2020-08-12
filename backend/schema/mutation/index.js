const graphql = require( 'graphql' );
const Book = require( '../../models/Book' );
const Author = require( '../../models/Author' );
const { AuthorType, BookType, LoginType } = require('../types');
const loginResolver = require( '../../resolvers/login' );

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull,
} = graphql;

const Mutation = new GraphQLObjectType( {
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString ) },
                age: { type: new GraphQLNonNull( GraphQLInt ) }
            },
            async resolve( parent, args ) {
                const author = new Author( {
                    name: args.name,
                    age: args.age
                } );

                await author.save();

                return author;

            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString ) },
                genre: { type: new GraphQLNonNull( GraphQLString ) },
                authorId: { type: new GraphQLNonNull( GraphQLID ) }
            },
            async resolve( parent, args ) {
                const book = new Book( {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                } );

                await book.save();

                return book;

            }
        },
        login: {
            type: LoginType,
            args: { email: { type: new GraphQLNonNull( GraphQLString ) }, password: { type: new GraphQLNonNull( GraphQLString ) } },
            resolve: loginResolver
        }
    }
} );

module.exports = Mutation;