import { useState } from 'react';

import SearchIcon from '@material-ui/icons/Search';

export const search = () => {

    const [ value, setValue ] = useState( '' );

    const onSubmit = ( e ) => {
        e.preventDefault();
        console.log( value );
    };
    
    return (
        <form className = 'search' onSubmit = { onSubmit }>
            <input
                name='search'
                tabIndex = {0}
                className = 'search__input'
                value = { value }
                onChange = { ( e ) => { setValue( e.target.value ) } }
                placeholder = 'Search your product from here'
            />
            <button className = 'search__button' type='submit' ><SearchIcon fontSize='large'/></button>
        </form>   
    )
}
search.defaultProps = {};