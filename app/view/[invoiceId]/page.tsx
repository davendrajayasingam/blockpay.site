import { headers } from 'next/headers'

import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'

type Props = {
    params: {
        invoiceId: string
    }
}

export default async function ViewInvoicePage({ params }: Props)
{
    const invoiceId = params.invoiceId

    const invoiceData: InvoiceData = await fetch(getAbsolutePath(`/api/invoice/${invoiceId}`),
        {
            cache: 'no-store',
            method: 'GET',
            headers: {
                cookie: headers().get('cookie') ?? ''
            }
        })
        .then(res => res.json())

    if (Object.keys(invoiceData).length === 0)
    {
        throw new Error('Invoice not found')
    }


    const handlePayment = (e: React.FormEvent<HTMLButtonElement>) =>
    {
        e.preventDefault()
    }

    return (
        <div>
            <p>Business Name:{invoiceData.businessName}</p>
            <p>Amount Due: {invoiceData.paymentAmount}</p>
            <p>Payment Currency: {invoiceData.paymentCurrency}</p>

            <button
                onClick={handlePayment}
            >
                Pay
            </button>
        </div>
    )
}