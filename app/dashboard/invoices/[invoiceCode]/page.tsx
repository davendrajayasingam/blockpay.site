import { headers } from 'next/headers'

import DashboardLayout from '@/app/dashboard/DashboardLayout'
import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'

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

    return <DashboardLayout>
        {
            invoiceNotFound
                ? <p className='text-rose-500'>Invoice not found!</p>
                : <ManageInvoice
                    invoiceData={invoiceData}
                    paymentsData={paymentsData}
                />
        }
    </DashboardLayout>
}