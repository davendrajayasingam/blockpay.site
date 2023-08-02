import DashboardLayout from '@/app/dashboard/DashboardLayout'

type Props = {
    invoices: InvoiceData[]
}

export default function Invoices({ invoices }: Props)
{
    return <div>

        <p>Invoice</p>

        <div>
            <a
                href='/dashboard/invoices/new'
                className='button'
            >
                Create an invoice
            </a>
        </div>

    </div>
}