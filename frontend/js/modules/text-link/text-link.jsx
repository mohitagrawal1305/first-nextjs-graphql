import Link from 'next/link';

export const textLink = ( { label, href } ) => {

    return (
        <Link href = { href } >
            <span className='text-link' >
                { label }
            </span>
        </Link>
    )
};

textLink.defaultProps = {
    href: '/',
    label: 'Dashboard'
};