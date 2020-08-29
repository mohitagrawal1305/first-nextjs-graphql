import { gql } from '@apollo/client';

export const addToCard = gql`
    mutation addToCard( $productId: ID! ) {
        addToCard( productId: $productId ) {
            products {
                name
                images
                price
                id
            }
        }
    }
`;
