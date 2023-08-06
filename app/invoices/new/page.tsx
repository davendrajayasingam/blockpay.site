import DashboardHeader from '@/app/invoices/DashboardHeader'
import Footer from '@/app/Footer'

import getFiatCurrencies from './getFiatCurrencies'
import NewInvoice from './NewInvoice'

export default async function DashboardPage()
{
    const fiatCurrencies: FiatCurrency[] = await getFiatCurrencies()

    return <>
        <DashboardHeader />
        <main className='flex flex-col space-y-4'>
            <div>
                <h1 className='title'>
                    Create A New Invoice
                </h1>
                <p className='text'>
                    Fill in the form below to create a new invoice.
                </p>
            </div>
            <NewInvoice fiatCurrencies={fiatCurrencies} />
        </main>
        <Footer />
    </>
}