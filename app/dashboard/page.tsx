import { headers } from 'next/headers'

import { getAbsolutePath } from '@/utils/helpers/absolutePathHelper'

import Dashboard from './Dashboard'
import DashboardLayout from './DashboardLayout'

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

  return <DashboardLayout>
    <Dashboard invoices={invoices} />
  </DashboardLayout>
}