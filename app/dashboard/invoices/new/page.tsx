import DashboardLayout from '@/app/dashboard/DashboardLayout'
import getFiatCurrencies from './getFiatCurrencies'
import NewInvoice from './NewInvoice'

export default async function DashboardPage()
{
    const fiatCurrencies: FiatCurrency[] = await getFiatCurrencies()

    return <DashboardLayout>
        <NewInvoice fiatCurrencies={fiatCurrencies} />
    </DashboardLayout>
}