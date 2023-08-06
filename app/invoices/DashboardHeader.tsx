

import Link from 'next/link'

import Logo from './Logo'
import { LiaFileInvoiceDollarSolid, LiaLifeRingSolid } from 'react-icons/lia'

export default function DashboardHeader()
{
    return (
        <header className='sticky top-0 bg-gray-900 shadow-md border-b border-white/10'>
            <div className='p-4 flex flex-row items-center justify-between bg-black/20'>
                <div className='flex flex-row items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-5'>
                    <Logo />
                    <Link
                        href='/invoices'
                        className='flex flex-col items-center font-bold text-slate-400 hover:text-white bg-transparent hover:bg-sky-500 p-2 rounded-md transition-colors duration-300 ease-in-out'
                    >
                        <LiaFileInvoiceDollarSolid className='text-3xl mx-auto' />
                        <span className='text-xs text-center'>Invoices</span>
                    </Link>
                    <Link
                        href='/support'
                        className='flex flex-col items-center font-bold text-slate-400 hover:text-white bg-transparent hover:bg-sky-500 p-2 rounded-md transition-colors duration-300 ease-in-out'
                    >
                        <LiaLifeRingSolid className='text-3xl mx-auto' />
                        <span className='text-xs text-center'>Support</span>
                    </Link>
                </div>
                <Link
                    href='/auth/logout'
                    className='bg-transparent hover:bg-sky-500 sm:px-4 py-2 rounded-md font-bold text hover:text-white transition-colors duration-300 ease-in-out'
                >
                    Logout
                </Link>
            </div>
        </header>
    )
}