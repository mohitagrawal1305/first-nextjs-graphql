const withSass = require('@zeit/next-sass')
const alias = require( './alias.config' );

module.exports = withSass( {
    webpack: function ( config ) {
        config.resolve.alias = {
            ...config.resolve.alias,
            ...alias
        };

        return config;
    }
} )