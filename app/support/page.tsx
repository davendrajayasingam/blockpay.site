import DashboardHeader from '@/app/invoices/DashboardHeader'
import Footer from '@/app/Footer'

import EmailSupport from '@/app/invoices/[invoiceCode]/EmailSupport'

export default async function DashboardPage()
{
    return <div className='flex flex-col justify-between min-h-screen'>
        <div>
            <DashboardHeader />
            <main>
                <EmailSupport />
            </main>
        </div>
        <Footer />
    </div>
}