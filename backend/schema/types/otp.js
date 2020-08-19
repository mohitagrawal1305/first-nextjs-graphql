const graphql = require( 'graphql' );

const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;


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

module.exports = { OtpType };