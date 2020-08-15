const path = require( 'path' );

module.exports = {

    'modules': path.resolve( __dirname, 'frontend/js/modules' ),
    'component': path.resolve( __dirname, 'frontend/js/component' ),
    'mutations': path.resolve( __dirname, 'frontend/js/services/mutations' ),
    'query': path.resolve( __dirname, 'frontend/js/services/query' ),
    'utils': path.resolve( __dirname, 'frontend/js/utils' ),
    'hooks': path.resolve( __dirname, 'frontend/js/hooks' ),

    // scss globals
    'scss-globals': path.resolve( __dirname, 'frontend/styles/globals/index.scss' )
};
