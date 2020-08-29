import { gql } from '@apollo/client';

export const cartQuery = gql`
{
  cart {
      products {
        name
        images
        price
        _id
    }
  }
}
`;
