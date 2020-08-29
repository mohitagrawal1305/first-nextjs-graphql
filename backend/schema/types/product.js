const graphql = require( 'graphql' );
const { UserType } = require( './user' );
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLID
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


const ProductType = new GraphQLObjectType( {
    name: 'ProductType',
    fields:{
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        price: {
            type: GraphQLInt
        },
        likes: {
            type: new GraphQLList( UserType )
        },
        quantity: {
            type: GraphQLInt
        },
        comments: {
            type: new GraphQLList( commentType )
        },
        images: {
            type: new GraphQLList( GraphQLString )
        },
        date: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        msg: {
            type: GraphQLString
        }
    }
} );

module.exports = { ProductType };