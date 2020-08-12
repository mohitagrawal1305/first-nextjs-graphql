import { gql } from '@apollo/client';

export const getUserQuery = gql`
{
    user {
      name
      avatar
      email
    }
}
`;