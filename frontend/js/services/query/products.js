import { gql } from '@apollo/client';

// export const getAllProductsQuery = gql`
// {
//   getAllProducts {
//       name
//       description
//       images
//       price
//       quantity
//       _id
//     }
// }
// `;
export const getAllProductsQuery = gql`
  query getAllProducts( $query: String ){
    getAllProducts( query: $query ) {
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
    query getProductById($id: ID!) {
      getProductById( id: $id ) {
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