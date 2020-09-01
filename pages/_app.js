import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { useReducer, useEffect } from 'react';

import '../frontend/styles/app.style.scss'
import { globalContext } from '../frontend/js/store';
import { initialState, reducer, ACTIONS } from '../frontend/js/store/reducer';
import { getToken } from '../frontend/js/utils/getToken';

const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache()
});
function MyApp({ Component, pageProps }) {

  const [ store, dispatch ] = useReducer( reducer, initialState );

  useEffect( () => {
    const token = getToken();
        
    if( token ) {
        dispatch( ACTIONS.SET_USER_LOGGED_IN );
    }
  }, [] );

  return (
    <ApolloProvider client={client}>
      <globalContext.Provider value = { { store, dispatch } } >
        <Component {...pageProps} />
      </globalContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp
