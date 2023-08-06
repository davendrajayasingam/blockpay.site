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
                        <th scope='col' className='text'>
                            Status
                        </th>
                        <th scope='col' className='w-full text md:hidden'>
                            Info
                        </th>
                        <th scope='col' className='text hidden md:table-cell'>
                            Date
                        </th>
                        <th scope='col' className='text hidden md:table-cell'>
                            Code
                        </th>
                        <th scope='col' className='text hidden md:table-cell'>
                            Customer Name
                        </th>
                        <th scope='col' className='text hidden md:table-cell'>
                            Amount
                        </th>
                        <th scope='col' className='text hidden md:table-cell'>
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
                                    'pl-2 py-2 font-bold text text-center',
                                    invoice.status === 'OPEN' ? 'text-sky-500' : '',
                                    invoice.status === 'VIEWED' ? 'text-amber-500' : '',
                                    invoice.status === 'PAID' ? 'text-emerald-500' : '',
                                    invoice.status === 'UNRESOLVED' ? 'text-rose-500' : '',
                                )}>
                                    {invoice.status}
                                    <Link
                                        href={`/invoices/${invoice.invoiceCode}`}
                                        className='button md:hidden mt-4 block'
                                    >
                                        View
                                    </Link>
                                </td>
                                <td className='py-2 text text-center md:hidden'>
                                    {invoice.customerName}
                                    <br />
                                    Amount: {invoice.paymentCurrency} {invoice.paymentAmount}
                                    <br />
                                    {format(new Date(invoice.createdAt), 'EEE, do MMM yyyy, K:mm a')}
                                    <br />
                                    Code: {invoice.invoiceCode}
                                </td>
                                <td className='py-2 text text-center hidden md:table-cell'>
                                    {format(new Date(invoice.createdAt), 'EEE, do MMM yyyy, K:mm a')}
                                </td>
                                <td className='py-2 text text-center hidden md:table-cell'>
                                    {invoice.invoiceCode}
                                </td>
                                <td className='py-2 text text-center hidden md:table-cell'>
                                    {invoice.customerName}
                                </td>
                                <td className='py-2 text text-center hidden md:table-cell'>
                                    {invoice.paymentCurrency} {invoice.paymentAmount}
                                </td>
                                <td className='pr-2 py-2 text-center hidden md:table-cell'>
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