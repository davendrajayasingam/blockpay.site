'use client'

import SpinnerButton from '@/app/(ui)/SpinnerButton'
import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

type Props = {
    invoiceData: InvoiceData
}

export default function ViewInvoice({ invoiceData }: Props)
{
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handlePayment = () =>
    {
        setIsSubmitting(true)
        axios.post(`/api/invoice/${invoiceData.invoiceId}/pay`, {})
            .then(res => window.location.href = res.data.redirectUrl)
            .catch(err =>
            {
                setIsSubmitting(false)
                console.log(err)
                toast.error('Something went wrong!')
            })
    }

    return <div className='bg-black/5 border border-white/5 p-4 rounded-md shadow-md flex flex-col space-y-8'>

        <div>
            <h1 className='invoice-title'>
                Invoice
            </h1>
            <hr className='separator' />
        </div>

        <div>
            <p className='invoice-text'>
                Invoice Number: {invoiceData.invoiceId}
            </p>
            <p className='invoice-text'>
                Dated: {new Date(invoiceData.createdAt).toLocaleString()}
            </p>
        </div>

        <div>
            <h2 className='invoice-heading'>
                Billed To:
            </h2>
            <hr className='separator' />
            <p className='invoice-text mt-2'>
                {invoiceData.customerName}
            </p>
            <p className='invoice-text'>
                {invoiceData.customerEmail}
            </p>
            {
                invoiceData.businessName
                && <p className='invoice-text'>
                    {invoiceData.businessName}
                </p>
            }
        </div>

        <div>
            <h2 className='invoice-heading'>
                Total Due
            </h2>
            <hr className='separator' />
            <p className='invoice-text mt-2'>
                {invoiceData.paymentCurrency} {invoiceData.paymentAmount}
            </p>
        </div>

        {
            invoiceData.memo
            && <div>
                <h1 className='invoice-heading'>
                    Memo
                </h1>
                <hr className='separator' />
                <p className='invoice-text mt-2'>
                    {invoiceData.memo}
                </p>
            </div>
        }

        <div>
            <h1 className='invoice-heading'>
                Payment
            </h1>
            <div className='mt-2'>
                <SpinnerButton
                    type='submit'
                    showSpinner={isSubmitting}
                    onClick={handlePayment}
                >
                    Pay
                </SpinnerButton>
            </div>
        </div>

    </div>
}