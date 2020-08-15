import { gql } from '@apollo/client';

export const loginMutation = gql`
    mutation login( $email: String!, $password: String! ) {
        login( email: $email, password: $password ){
            token
            msg
        }
    }
`;
export const loginUsingGoogleMutation = gql`
    mutation loginUsingGoogle( $email: String! ) {
        loginUsingGoogle( email: $email ){
            token
            msg
        }
    }
`;
