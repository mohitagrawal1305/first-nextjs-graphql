const graphql = require( 'graphql' );

const userQuery = require( './user' );
const {
    getAllProducts,
    getProductById
} = require( './products' );
const cartQuery = require( './cart' );

const {
    GraphQLObjectType,
} = graphql;

const RootQuery = new GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {
        user: userQuery,
        getAllProducts,
        getProductById,
        cart: cartQuery
    }
} );

module.exports = RootQuery;