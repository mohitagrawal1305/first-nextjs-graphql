const graphql = require( 'graphql' );

const userQuery = require( './user' );
const productsQuery = require( './products' );
const cartQuery = require( './cart' );

const {
    GraphQLObjectType,
} = graphql;

const RootQuery = new GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {
        user: userQuery,
        products: productsQuery,
        cart: cartQuery
    }
} );

module.exports = RootQuery;