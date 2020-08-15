import { noop } from 'lodash';

export const button = ( { type, onClick, label, children } ) => {

    return (
        <button className = 'button' type= { type } onClick = { onClick }>
            {
                children ? (
                    children
                ) : (
                    label
                )
            }
        </button>
    )
}
button.defaultProps = {
    label: 'Submit',
    onClick: noop,
    type: 'button'
};