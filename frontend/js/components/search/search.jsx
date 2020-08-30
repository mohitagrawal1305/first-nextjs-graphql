import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import { noop } from 'lodash';

export const search = ( props ) => {

    const [ value, setValue ] = useState( '' );

    const onSubmit = ( e ) => {
        e && e.preventDefault();
        props.onSubmit( value );
    };

    const onChange = ( e ) => {
        setValue( e.target.value )
    };

    return (
        <form className = 'search' onSubmit = { onSubmit }>
            <input
                name='search'
                tabIndex = {0}
                className = 'search__input'
                value = { value }
                onChange = { onChange }
                placeholder = 'Search your product from here'
            />
            <button className = 'search__button' type='submit' ><SearchIcon fontSize='large'/></button>
        </form>   
    )
}
search.defaultProps = {
    onSubmit: noop
};