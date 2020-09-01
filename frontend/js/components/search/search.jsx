import { useState, useContext } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import { globalContext } from '../../store';
import { ACTIONS } from '../../store/reducer';

export const search = () => {

    const { store, dispatch } = useContext( globalContext );
    
    const [ value, setValue ] = useState( store.searchQuery );

    const onSubmit = ( e ) => {
        e && e.preventDefault();
        dispatch( { type: ACTIONS.UPDATE_SEARCH_QUERY, payload: value } );
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
search.defaultProps = {};