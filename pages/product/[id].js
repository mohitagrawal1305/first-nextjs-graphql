import { getAllProductIds, getProductById } from '../../backend/resolvers/products';

const Product = ( { product } ) => {
   
  
    return <p>Product: {product.name}</p>
  }
  
  export default Product;

  export async function getStaticPaths() {

    // Return a list of possible value for id
    const paths = await getAllProductIds();
    
    return {
      paths,
      fallback: false
    }
  }

  export async function getStaticProps({ params }) {

    // Fetch necessary data for the blog post using params.id
    const product = await getProductById( params.id );

    return {
      props: {
        product
      }
    }

  }