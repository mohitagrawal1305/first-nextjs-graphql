import { useQuery } from '@apollo/client';
import { getUserQuery } from 'query/user';
import { preloader as Preloader } from 'modules/preloader';

export const home = props => {
  const { client, loading, error, data } = useQuery( getUserQuery );
  //const name = get( data, 'user.name', `to e-Commerce` );

    if( loading ) {
      return (
        <Preloader/>
      );
    }
    return (
      <main className = 'home' >
        <section className= 'home__main-section' >
          <h1 className= 'home__main-section__title' >Work in Progress</h1>
        </section>
        </main>
    )
}
