import { get } from "lodash";

export const initialState = {
    isUserLoggedIn: false,
    searchQuery: ''
};

export const ACTIONS = {
    SET_USER_LOGGED_IN: 'SET_USER_LOGGED_IN',
    SET_USER_LOGGED_OUT: 'SET_USER_LOGGED_OUT',
    UPDATE_SEARCH_QUERY: 'UPDATE_SEARCH_QUERY'
};

export const reducer = ( state, action ) => {

    const type = get( action, 'type', action );
    const payload = get( action, 'payload', '' );
    
    switch ( type ) {
        case ACTIONS.SET_USER_LOGGED_IN: {
            return {
                ...state,
                isUserLoggedIn: true
            };
        }
        case ACTIONS.SET_USER_LOGGED_OUT: {
            return {
                ...state,
                isUserLoggedIn: false
            };
        }

        case ACTIONS.UPDATE_SEARCH_QUERY: {
            return {
                ...state,
                searchQuery: payload
            }
        }
        default:
           return state;
    }
};