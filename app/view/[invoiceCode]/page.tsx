import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'
import ViewInvoice from '@/app/invoices/[invoiceCode]/ViewInvoice'
import Footer from '@/app/Footer'
import Header from '@/app/Header'

type Props = {
    params: {
        invoiceCode: string
    }
}

export default async function ViewInvoicePage({ params }: Props)
{
    const invoiceCode = params.invoiceCode

    const invoiceData = await fetch(getAbsolutePath(`/api/view/${invoiceCode}`),
        {
            cache: 'no-store',
            method: 'GET'
        })
        .then(res => res.json())

    const invoiceNotFound = Object.keys(invoiceData).length === 0

    return <div className='flex flex-col justify-between min-h-screen'>
        <div>
            <Header />
            <main>
                {
                    invoiceNotFound
                        ? <p className='text-rose-500 text-center'>Invoice not found!</p>
                        : <ViewInvoice invoiceData={invoiceData} />
                }
            </main>
        </div>
        <Footer />
    </div>
}