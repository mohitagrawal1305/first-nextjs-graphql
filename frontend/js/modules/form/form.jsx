import { noop, castArray, isEmpty } from 'lodash';
import { useState } from 'react';
import { button as Button } from 'modules/button'
import { CircularProgress } from '@material-ui/core';
import { inputField as InputField } from 'modules/input-field'
import { Alert } from '@material-ui/lab';

export const form = ( { fields, onSubmit, actions, loading, title, subtitle, selectedValues, status, msg } ) => {

    let initialFormData = {};
    isEmpty( selectedValues ) ? fields.map( field => initialFormData[ field.name ] = '' ) : initialFormData = selectedValues;

    const [ formData, setFormData ] = useState( initialFormData );

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
            {
                title && (
                    <h1 className = 'form__title' > { title } </h1>
                )
            }
            {
                subtitle && (
                    <h2 className = 'form__subtitle' > { subtitle } </h2>
                )
            }

            { renderFields( { onChange, fields, formData } ) }
            {
                !isEmpty( status ) && !isEmpty( msg ) && (
                    <Alert severity= { status }>
                        { msg }
                    </Alert>
                )
            }
            { renderButtons( { actions: castArray( actions ), loading } ) }
        </form>
    )
}
form.defaultProps = {
    fields: [],
    actions: [],
    onSubmit: noop,
    loading: false,
    title: '',
    subtitle: '',
    selectedValues: {},
    status: '',
    msg: ''
};

const renderButtons = ( { actions, loading } ) => {
    return !isEmpty( actions ) && (
        <div className = 'form__actions' >
            {
                actions.map( ( action, index ) => {
                    const isLastItem = actions.length - 1 === index;
                    if( loading && isLastItem ) {
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
                            inverted = { !isLastItem }
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
                        key = { field.name }
                        { ...field }
                        onChange = { onChange }
                        value = { formData[ field.name ] }
                    />
                );
            }
        }
    } );
};