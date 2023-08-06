import { headers } from 'next/headers'

import DashboardHeader from '@/app/invoices/DashboardHeader'
import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'
import Footer from '@/app/Footer'

import ManageInvoice from './ManageInvoice'

type Props = {
    params: {
        invoiceCode: string
    }
}

export default async function DashboardPage({ params }: Props)
{
    const invoiceCode = params.invoiceCode

    const invoiceData = await fetch(getAbsolutePath(`/api/invoice/${invoiceCode}`),
        {
            cache: 'no-store',
            method: 'GET',
            headers: {
                cookie: headers().get('cookie') ?? ''
            }
        })
        .then(res => res.json())

    const paymentsData = await fetch(getAbsolutePath(`/api/invoice/${invoiceCode}/payments`),
        {
            cache: 'no-store',
            method: 'GET',
            headers: {
                cookie: headers().get('cookie') ?? ''
            }
        })
        .then(res => res.json())

    const invoiceNotFound = Object.keys(invoiceData).length === 0

    return <>
        <DashboardHeader />
        <main>
            {
                invoiceNotFound
                    ? <p className='text-rose-500'>Invoice not found!</p>
                    : <ManageInvoice
                        invoiceData={invoiceData}
                        paymentsData={paymentsData}
                    />
            }
        </main>
        <Footer />
    </>
}