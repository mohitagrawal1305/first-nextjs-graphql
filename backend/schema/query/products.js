const graphql = require( 'graphql' );
const { isEmpty } = require( 'lodash' );

const { ProductType } = require( '../types/product' );
const Product = require( '../../models/Product' );

const {
    GraphQLList,
    GraphQLString
} = graphql;

module.exports = {
    type: new GraphQLList( ProductType ),
    args: { query: { type: GraphQLString } },
    async resolve( parent, args ) {

        const { query } = args;

        
        const products = await Product.find();
        
        if( !isEmpty( query ) ) {
            const _products = products.filter( item => {

                return !isEmpty( item.name.toLowerCase().replace( ' ', '' ).match( query.toLowerCase().replace( ' ', '' ) ) );
            } );

            return _products;
        }

        return products;
    }
};