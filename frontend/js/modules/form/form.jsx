import { noop, castArray, isEmpty } from 'lodash';
import { useState } from 'react';
import { button as Button } from 'modules/button'
import { CircularProgress } from '@material-ui/core';
import { inputField as InputField } from 'modules/input-field'

export const form = ( { fields, onSubmit, actions, isLoading } ) => {

    const [ formData, setFormData ] = useState( {} );

    const _onSubmit = ( event ) => {
        event.preventDefault();
        onSubmit( formData );
    };

    const onChange = ( e ) => {
        setFormData( {
        ...formData,
        [ e.target.name ]: e.target.value
        } );
    };

    return (
        <form className = 'form'  onSubmit = { _onSubmit }>
            { renderFields( { onChange, fields, formData } ) }
            { renderButtons( { actions: castArray( actions ), isLoading } ) }
        </form>
    )
}
form.defaultProps = {
    fields: [],
    actions: [],
    onSubmit: noop,
    isLoading: false
};

const renderButtons = ( { actions } ) => {
    return !isEmpty( actions ) && (
        <div className = 'form__actions' >
            {
                actions.map( ( action, index ) => {
                    const isLastItem = actions.length - 1 === index;
                    if( isLoading && isLastItem ) {
                        return (
                            <Button className = 'form__action__item' >
                                <CircularProgress size = { 25 } />
                            </Button>
                        );
                    }
                    return (
                        <Button
                            className = 'form__action__item'
                            { ...action }
                            type = { isLastItem ? 'submit' : 'button' }
                        />
                    );
                } )
            }
        </div>
    );
};

const renderFields = ( { onChange, fields, formData } ) => {
    return fields && fields.map( field => {
        
        switch ( field.type ) {
            
            default: {
                return (
                    <InputField
                        { ...field }
                        onChange = { onChange }
                        value = { formData[ field.name ] }
                    />
                );
            }
        }
    } );
};