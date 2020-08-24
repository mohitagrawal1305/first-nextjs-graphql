const graphql = require( 'graphql' );
const { AddOrUpdateUserType } = require('../types/user');
const { LoginType } = require( '../types/login' );
const { OtpType } = require( '../types/otp' );
const { login, loginUsingGoogle } = require( '../../resolvers/login' );
const { otpGenerator } = require( '../../resolvers/otp' );
const { addOrUpdateUser } = require( '../../resolvers/addOrUpdateUser' );
const { CartType } = require( '../types/cart' );
const { addToCart } = require( '../../resolvers/addToCart' );

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID
} = graphql;

const Mutation = new GraphQLObjectType( {
    name: 'Mutation',
    fields: {
        login: {
            type: LoginType,
            args: { email: { type: new GraphQLNonNull( GraphQLString ) }, password: { type: new GraphQLNonNull( GraphQLString ) } },
            resolve: login
        },
        loginUsingGoogle: {
            type: LoginType,
            args: { email: { type: new GraphQLNonNull( GraphQLString ) } },
            resolve: loginUsingGoogle
        },
        generateOTP: {
            type: OtpType,
            args: { email: { type: new GraphQLNonNull( GraphQLString ) }, newUser: { type: new GraphQLNonNull( GraphQLBoolean ) } },
            resolve: otpGenerator
        },
        register: {
            type: AddOrUpdateUserType,
            args: {
                email: { type: new GraphQLNonNull( GraphQLString ) },
                password: { type: new GraphQLNonNull( GraphQLString ) },
                confirmPassword: { type: new GraphQLNonNull( GraphQLString ) },
                otp: { type: new GraphQLNonNull( GraphQLString ) },
                name: { type: new GraphQLNonNull( GraphQLString ) },
            },
            async resolve( parent, args ) {
                const response = await addOrUpdateUser( { parent, args, newUser: true } );
                return response;
            }
        },
        resetPassword: {
            type: AddOrUpdateUserType,
            args: {
                email: { type: new GraphQLNonNull( GraphQLString ) },
                password: { type: new GraphQLNonNull( GraphQLString ) },
                confirmPassword: { type: new GraphQLNonNull( GraphQLString ) },
                otp: { type: new GraphQLNonNull( GraphQLString ) },
            },
            async resolve( parent, args ) {
                const response = await addOrUpdateUser( { parent, args, newUser: false } );
                return response;
            }
        },
        addToCard: {
            type: CartType,
            args: {
                productId: { type: new GraphQLNonNull( GraphQLID ) }
            },
            resolve: addToCart
        }
    }
} );

module.exports = Mutation;