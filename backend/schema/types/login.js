const graphql = require( 'graphql' );

const {
    GraphQLObjectType,
    GraphQLString,
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

module.exports = { LoginType };