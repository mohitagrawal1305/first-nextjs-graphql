export const initialState = {
    isUserLoggedIn: false
};

export const ACTIONS = {
    SET_USER_LOGGED_IN: 'SET_USER_LOGGED_IN',
    SET_USER_LOGGED_OUT: 'SET_USER_LOGGED_OUT'
};

export const reducer = ( state, action ) => {
    switch ( action ) {
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
        default:
           return state;
    }
};