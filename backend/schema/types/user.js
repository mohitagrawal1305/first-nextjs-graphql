const graphql = require( 'graphql' );

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = graphql;
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

module.exports = { UserType, AddOrUpdateUserType };