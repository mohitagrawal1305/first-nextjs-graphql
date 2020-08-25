const graphql = require( 'graphql' );
const { ProductType } = require( './product' );
const Product = require( '../../models/Product' );
const { get, isEmpty } = require( 'lodash' );

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = graphql;


const CartType = new GraphQLObjectType( {
    name: 'CartType',
    fields:{
        id: {
            type: GraphQLID
        },
        products: {
            type: new GraphQLList( ProductType ),
            async resolve( parent, args ) {

                const products = [];

                let i = 0;

                if( isEmpty( get( parent, 'products', [] ) ) ) {
                    return [];
                }

                while( i < parent.products.length ) {
                    const _productId = parent.products[ i ];

                    const _product = await Product.findById( _productId );
                
                    if( _product ) {
                        products.push( _product );
                    }

                    i++;
                }
                
                return products;
            }
        },
        date: {
            type: GraphQLString
        }
    }
} );

module.exports = { CartType };