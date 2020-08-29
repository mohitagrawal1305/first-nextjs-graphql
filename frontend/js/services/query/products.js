import { gql } from '@apollo/client';

export const getAllProductsQuery = gql`
{
  getAllProducts {
      name
      description
      images
      price
      quantity
      _id
    }
}
`;
export const getProductByIdQuery = gql`
{
    getAllProducts( id: $id ) {
        name
        description
        images
        price
        quantity
        likes
        comments
      }
  }
`;