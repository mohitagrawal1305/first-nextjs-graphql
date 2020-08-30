import Head from 'next/head'

import { getAllProductIds, getProductById } from '../../backend/resolvers/products';
import { Product as ProductComponent } from '../../frontend/js/components/Product';
import { header as HeaderComponent } from '../../frontend/js/components/header'
import { cart as Cart } from '../../frontend/js/components/cart';

const Product = ( { product } ) => {
  
    return (
      <>
        <Head>
          <title> { product.name } </title>
        </Head>
        <HeaderComponent />
        <div className = 'page-with-header' >
          <ProductComponent { ...product } />
          <Cart />
        </div>
        
      </>
    );
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
        product: {
          ...product,
          id: params.id
        }
      }
    }

  }