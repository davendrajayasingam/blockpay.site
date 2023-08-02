import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'
import DashboardLayout from '../../DashboardLayout'
import ManageInvoice from './ManageInvoice'
import { headers } from 'next/headers'

type Props = {
    params: {
        invoiceId: string
    }
}

export default async function DashboardPage({ params }: { params: { invoiceId: string } })
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

    const invoiceNotFound = Object.keys(invoiceData).length === 0

    return <DashboardLayout>
        {
            invoiceNotFound
                ? <p className='text-rose-500'>Invoice not found!</p>
                : <ManageInvoice invoiceData={invoiceData} />
        }
    </DashboardLayout>
}