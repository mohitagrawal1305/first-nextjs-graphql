import { search as Search } from '../search';
import { ProductsList } from '../ProductsList';

export const home = () => {

    return (
      <main className = 'home' >
        <section className= 'home__main-section' >
          <h1 className= 'home__main-section__title' >Shop here</h1>
          <Search/>
        </section>
        <ProductsList/>
        </main>
    )
}
