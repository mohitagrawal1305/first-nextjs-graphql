import classNames from 'classnames';

export const inputField = ( { name, value, type, onChange, required, placeholder, className } ) => {

    const properties = {
        ...( name ? { name } : {} ),
        ...( type ? { type } : {} ),
        ...( onChange ? { onChange } : {} ),
        ...( required ? { required } : {} ),
        ...( value ? { value } : {} ),
        ...( placeholder ? { placeholder } : {} ),
    };
    const _className = classNames( 'input', className );

    return (
        <input
            className = { _className }
            { ...properties }
          />
    )
}
