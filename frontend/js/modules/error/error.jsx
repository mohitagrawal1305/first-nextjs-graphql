export const error = ( { msg } ) => {
    
    return msg && (
        <p className = 'error' >
            { msg }
        </p>
    )
}
