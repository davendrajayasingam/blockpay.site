import { headers } from 'next/headers'

import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'
import Footer from '@/app/Footer'

import Invoices from './Invoices'
import DashboardHeader from './DashboardHeader'

export default async function DashboardPage()
{
  const invoices: InvoiceData[] = await fetch(getAbsolutePath('/api/invoice'),
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        cookie: headers().get('cookie') ?? ''
      }
    })
    .then(res => res.json())

  return <div className='flex flex-col justify-between min-h-screen'>
    <div>
      <DashboardHeader />
      <main>
        <Invoices invoices={invoices} />
      </main>
    </div>
    <Footer />
  </div>
}