import { gql } from '@apollo/client';

export const registerMutation = gql`
    mutation register( $name: String!, $email: String!, $password: String!, $confirmPassword: String!, $otp: String! ) {
        register( name: $name, email: $email, password: $password, confirmPassword: $confirmPassword, otp: $otp ){
            status
            msg
            token
        }
    }
`;
