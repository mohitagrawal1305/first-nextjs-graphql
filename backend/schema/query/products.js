const { ProductType } = require( '../types/product' );
const Product = require( '../../models/Product' );
const graphql = require( 'graphql' );

const {
    GraphQLList,
} = graphql;

module.exports = {
    type: new GraphQLList( ProductType ),
    async resolve( parent, args ) {
        const products = await Product.find();
        return products;
    }
};