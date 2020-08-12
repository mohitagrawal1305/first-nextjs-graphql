// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import database from '../../backend/config/db';

const { graphqlHTTP } = require('express-graphql');

const schema = require( '../../backend/schema/schema' );

database();

// {
//   "Authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwYjAxZWNiNjUxZWM2MjRlMjY3NTMzIn0sImlhdCI6MTU5Njk5MTAyMywiZXhwIjoxNTk3MzUxMDIzfQ.RM7D7HFY56T9W3WxOIJdvkRA7SkgzKbQ9yyVKDHDVgM"
// }

export default graphqlHTTP( {
  schema,
  graphiql: {
    headerEditorEnabled: true
  },
} );
