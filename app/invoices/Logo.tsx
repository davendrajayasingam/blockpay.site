import Link from 'next/link'

export default function Logo()
{
    return (
        <Link
            href='/'
            className='font-bold text-sky-500 flex flex-col'
        >
            <span className='text-3xl'>
                BLOCKPAY
            </span>
            <span className='-mt-2 text-xl text-slate-100'>
                Pay With Crypto
            </span>
        </Link>
    )
}