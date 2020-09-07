import { search as Search } from '../search';
import { ProductsList } from '../ProductsList';

export const home = () => {
    return (
      <main className = 'home' >
        <section className= 'home__main-section' style = { { backgroundImage: `url( https://shop.redq.now.sh/_next/static/images/cloths-bc740630f228713e4bb0de8a7bffce22.png )` } } >
          <h1 className= 'home__main-section__title' >Shop here</h1>
          <Search/>
        </section>
        <ProductsList/>
        </main>
    )
}
