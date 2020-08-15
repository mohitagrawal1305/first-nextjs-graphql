const graphql = require( 'graphql' );
const User = require( '../models/User' );

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;



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

const OtpType = new GraphQLObjectType( {
    name: 'OTP',
    fields:{
        status: {
            type: GraphQLString
        },
        msg: {
            type: GraphQLString
        }
    }
} );

const AddOrUpdateUserType = new GraphQLObjectType( {
    name: 'AddOrUpdateUser',
    fields:{
        status: {
            type: GraphQLString
        },
        msg: {
            type: GraphQLString
        },
        token: {
            type: GraphQLString
        },
    }
} );


module.exports = { LoginType, UserType, OtpType, AddOrUpdateUserType };