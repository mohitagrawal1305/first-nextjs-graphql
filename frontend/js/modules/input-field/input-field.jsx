export const inputField = ( { name, value, type, onChange, required, placeholder } ) => {

    const properties = {
        ...( name ? { name } : {} ),
        ...( type ? { type } : {} ),
        ...( onChange ? { onChange } : {} ),
        ...( required ? { required } : {} ),
        ...( value ? { value } : {} ),
        ...( placeholder ? { placeholder } : {} ),
    };

    return (
        <input
            className = 'input'
            { ...properties }
          />
    )
}
