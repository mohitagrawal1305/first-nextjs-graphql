const graphql = require( 'graphql' );
const RootQuery = require( './query/index' );
const Mutation = require( './mutation/index' );

const {
    GraphQLSchema,
} = graphql;

module.exports = new GraphQLSchema( {
    query: RootQuery,
    mutation: Mutation
} );