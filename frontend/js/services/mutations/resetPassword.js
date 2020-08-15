import { gql } from '@apollo/client';

export const resetPasswordMutation = gql`
    mutation resetPassword( $email: String!, $password: String!, $confirmPassword: String!, $otp: String! ) {
        resetPassword( email: $email, password: $password, confirmPassword: $confirmPassword, otp: $otp ){
            status
            msg
            token
        }
    }
`;
