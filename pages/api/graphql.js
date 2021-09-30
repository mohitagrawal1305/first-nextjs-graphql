// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import database from '../../backend/databaseConnection';

const { graphqlHTTP } = require('express-graphql');

const schema = require( '../../backend/schema/index' );

database();

export default graphqlHTTP( {
  schema,
  graphiql: true
} );
