import { classNames } from '@/utils/helpers/tailwindHelper'
import { format } from 'date-fns'
import Link from 'next/link'

type Props = {
    invoices: InvoiceData[]
}

export default function Invoices({ invoices }: Props)
{
    return <div className='flex flex-col space-y-8'>

        <h1 className='title'>
            Invoices
        </h1>

        <div>
            <Link
                href='/invoices/new'
                className='button'
            >
                Create a new invoice
            </Link>
        </div>

        {
            invoices?.[0]
            && <table className='border-separate border-spacing-y-3'>
                <thead>
                    <tr>
                        <th className='text'>
                            Status
                        </th>
                        <th className='text'>
                            Date
                        </th>
                        <th className='text'>
                            Code
                        </th>
                        <th className='text'>
                            Customer Name
                        </th>
                        <th className='text'>
                            Amount
                        </th>
                        <th className='text'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        invoices.map(invoice => (
                            <tr 
                            key={invoice.invoiceId}
                            className='h-16 bg-black/20 border border-white/5 p-4 rounded-md shadow-md'
                            >
                                <td className={classNames(
                                    'font-bold text text-center',
                                    invoice.status === 'OPEN' ? 'text-sky-500' : '',
                                    invoice.status === 'VIEWED' ? 'text-amber-500' : '',
                                    invoice.status === 'PAID' ? 'text-emerald-500' : '',
                                    invoice.status === 'UNRESOLVED' ? 'text-rose-500' : '',
                                )}>
                                    {invoice.status}
                                </td>
                                <td className='text text-center'>
                                    {format(new Date(invoice.createdAt), 'EEE, do MMM yyyy, K:mm a')}
                                </td>
                                <td className='text text-center'>
                                    {invoice.invoiceCode}
                                </td>
                                <td className='text text-center'>
                                    {invoice.customerName}
                                </td>
                                <td className='text text-center'>
                                    {invoice.paymentCurrency} {invoice.paymentAmount}
                                </td>
                                <td className='text-center'>
                                    <Link
                                        href={`/invoices/${invoice.invoiceCode}`}
                                        className='button'
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }

    </div>
}