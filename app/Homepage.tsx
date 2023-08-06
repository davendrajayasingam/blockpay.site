'use client'

import { useState } from 'react'
import Link from 'next/link'

import Logo from '@/app/invoices/Logo'
import DashboardTextInput from '@/app/(ui)/DashboardTextInput'

export default function Homepage()
{
    const [invoiceCode, setInvoiceCode] = useState('')

    return (
        <div className='flex flex-col items-center justify-center space-y-4 h-screen p-4'>

            <Logo />

            <p className='text text-justify max-w-sm mx-auto'>
                Welcome to BlockPay! This is a demo project to explore the use of Coinbase Commerce as a solution to accept crypto payments. You can view the source code using the link below. Do not transfer any crypto currencies unless you know what you are doing.
            </p>

            <a href='https://github.com/davendrajayasingam/blockpay.site' className='text-sky-500 underline'>https://github.com/davendrajayasingam/blockpay.site</a>

            <hr className='separator w-full max-w-sm mx-auto' />

            <Link
                href='/invoices'
                className='button'
            >
                Start Creating Invoices
            </Link>

            <div className='w-full max-w-sm mx-auto flex flex-row items-center space-x-2'>
                <hr className='separator w-full max-w-sm mx-auto' />
                <p className='text'>or</p>
                <hr className='separator w-full max-w-sm mx-auto' />
            </div>

            <div className='max-w-sm mx-auto flex flex-col space-y-2'>

                <p className='text'>
                    Input your invoice code below to view your invoice.
                </p>

                <DashboardTextInput
                    placeholder='eg: ZL2EREH7'
                    required
                    value={invoiceCode}
                    onChange={value => setInvoiceCode(value)}
                    textPosition='center'
                />

                <Link
                    href={`/view/${invoiceCode}`}
                    className='button text-center'
                >
                    View Invoice
                </Link>

            </div>

        </div>
    )
}