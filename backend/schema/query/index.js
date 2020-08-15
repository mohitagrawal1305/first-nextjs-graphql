const { UserType } = require( '../types' );

const graphql = require( 'graphql' );
const User = require( '../../models/User' );
const jwt = require( 'jsonwebtoken' );

const {
    GraphQLObjectType,
} = graphql;

const RootQuery = new GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {
        user: {
            type:UserType,
            async resolve( parent, args, request ) {
                const { authorization } = request.headers;
                
                if( authorization ) {
                    
                    const { user } = jwt.verify( authorization, 'mySecretToken' );

                    const _user = await User.findById( user.id );
                    
                    return _user;
                }
            }
        }
    }
} );

module.exports = RootQuery;