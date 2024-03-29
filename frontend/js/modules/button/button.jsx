import { noop } from 'lodash';
import classNames from 'classnames';

export const button = ( { type, onClick, label, children, className, inverted } ) => {

    const _className = classNames( 'button', className, {
        'button--inverted': inverted
    } );
    return (
        <button className = { _className } type= { type } onClick = { onClick }>
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
    type: 'button',
    className: '',
    inverted: false
};