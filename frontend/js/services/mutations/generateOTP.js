import { gql } from '@apollo/client';

export const generateOTPMutation = gql`
    mutation generateOTP( $email: String!, $newUser: Boolean! ) {
        generateOTP( email: $email, newUser: $newUser ){
            status
            msg
        }
    }
`;
