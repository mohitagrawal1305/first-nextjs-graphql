import { search as Search } from '../search';
import { ProductsList } from '../ProductsList';
import { useState } from 'react';

export const home = () => {

    const [ value, setValue ] = useState( '' );

    const onSubmit = ( _value ) => {
      setValue( _value );
    };
    
    return (
      <main className = 'home' >
        <section className= 'home__main-section' >
          <h1 className= 'home__main-section__title' >Shop here</h1>
          <Search onSubmit = { onSubmit } />
        </section>
        <ProductsList query = { value } />
        </main>
    )
}
