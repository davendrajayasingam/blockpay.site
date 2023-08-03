import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'
import DashboardLayout from '../../DashboardLayout'
import ManageInvoice from './ManageInvoice'
import { headers } from 'next/headers'

type Props = {
    params: {
        invoiceId: string
    }
}

export default async function DashboardPage({ params }: Props)
{
    const invoiceId = params.invoiceId

    const promises = []

    promises.push(fetch(getAbsolutePath(`/api/invoice/${invoiceId}`),
        {
            cache: 'no-store',
            method: 'GET',
            headers: {
                cookie: headers().get('cookie') ?? ''
            }
        })
        .then(res => res.json()))

    promises.push(fetch(getAbsolutePath(`/api/invoice/${invoiceId}/charges`),
        {
            cache: 'no-store',
            method: 'GET',
            headers: {
                cookie: headers().get('cookie') ?? ''
            }
        })
        .then(res => res.json()))

    const responses = await Promise.all(promises)

    const invoiceData: InvoiceData = responses[0]
    const chargesData: ChargeData[] = responses[1]

    const invoiceNotFound = Object.keys(invoiceData).length === 0

    return <DashboardLayout>
        {
            invoiceNotFound
                ? <p className='text-rose-500'>Invoice not found!</p>
                : <ManageInvoice
                    invoiceData={invoiceData}
                    chargesData={chargesData}
                />
        }
    </DashboardLayout>
}