const graphql = require( 'graphql' );
const { isEmpty } = require( 'lodash' );

const { ProductType } = require( '../types/product' );
const Product = require( '../../models/Product' );

const {
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLID
} = graphql;

const getAllProducts = {
    type: new GraphQLList( ProductType ),
    args: {
        query: { type: GraphQLString },
        startRecord: { type: GraphQLInt },
        limit: { type: GraphQLInt },
    },
    async resolve( parent, args ) {

        const { query } = args;

        //limit(3).skip(1)
        
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

const getProductById = {
    type: new GraphQLList( ProductType ),
    args: {
        id: { type: GraphQLID }
    },
    async resolve( parent, args ) {

        const { id } = args;
        
        const product = await Product.findById( id );

        return product;
    }
};

module.exports = {
    getAllProducts,
    getProductById
};