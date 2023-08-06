

import Link from 'next/link'

import Logo from './invoices/Logo'
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia'

export default function Footer()
{
    return (
        <footer className='mt-auto'>
            <div className='mt-12 bg-gray-900'>
                <p className='text-slate-400 text-sm text-center bg-black/20 p-2 border-t border-white/10'>
                    Made with ❤️ by Davendra Jayasingam
                </p>
            </div>
        </footer>
    )
}