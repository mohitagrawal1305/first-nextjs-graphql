const { UserType } = require( '../types' );
const graphql = require( 'graphql' );
const User = require( '../../models/User' );
const getLoggedInUserId = require( '../../utils/getLoggedInUserId' );

const {
    GraphQLObjectType,
} = graphql;

const RootQuery = new GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {
        user: {
            type:UserType,
            async resolve( parent, args, request ) {
                
                const userId = getLoggedInUserId( request );
                if( userId ) {
                    const _user = await User.findById( userId );
                    
                    return _user;
                }
            }
        }
    }
} );

module.exports = RootQuery;