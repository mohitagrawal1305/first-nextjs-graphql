const graphql = require( 'graphql' );
const { UserType } = require( './user' );
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = graphql;


const commentType = new GraphQLObjectType( {
    name: 'commentType',
    fields:{
        user: {
            type: UserType
        },
        text: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        }
    }
} );

const imageUrlType = new GraphQLObjectType( {
    name: 'imageUrlType',
    fields:{
        url: {
            type: GraphQLString
        }
    }
} );


const ProductType = new GraphQLObjectType( {
    name: 'ProductType',
    fields:{
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        price: {
            type: GraphQLString
        },
        likes: {
            type: new GraphQLList( UserType )
        },
        quantity: {
            type: GraphQLString
        },
        comments: {
            type: new GraphQLList( commentType )
        },
        images: {
            type: new GraphQLList( imageUrlType )
        },
        date: {
            type: GraphQLString
        }
    }
} );

module.exports = { ProductType };