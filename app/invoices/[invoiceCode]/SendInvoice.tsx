'use client'

import { useState } from 'react'
import axios from 'axios'

import SpinnerButton from '@/app/(ui)/SpinnerButton'
import { toast } from 'react-hot-toast'

type Props = {
    customerName: string,
    invoiceCode: string,
    status: string
}

export default function SendInvoice({ customerName, invoiceCode, status }: Props)
{
    const [isSending, setIsSending] = useState(false)

    const handleSubmit = () =>
    {
        setIsSending(true)
        const promise = axios.post(`/api/invoice/${invoiceCode}/send`)
            .finally(() => setIsSending(false))

        toast.promise(promise, {
            loading: 'Sending invoice...',
            success: 'Invoice sent successfully!',
            error: 'Something went wrong! Please try again.'
        })
    }

    if (status === 'VOID')
    {
        return null
    }

    return <div className='flex flex-col space-y-4 p-4 bg-black/10 rounded-md border border-white/10'>

        <h2 className='heading'>
            Send Invoice
        </h2>

        <p className='text'>
            Send this invoice to {customerName} by email.
        </p>

        <div>
            <SpinnerButton
                showSpinner={isSending}
                onClick={handleSubmit}
            >
                Send Invoice
            </SpinnerButton>
        </div>


    </div>
}