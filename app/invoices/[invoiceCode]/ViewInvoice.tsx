import { classNames } from '@/utils/helpers/tailwindHelper'
import { format } from 'date-fns'

type Props = {
    invoiceData: InvoiceData
}

export default function ViewInvoice({ invoiceData }: Props)
{
    return <div className='bg-black/5 border border-sky-500 p-4 rounded-md shadow-md flex flex-col space-y-8'>

        <div>
            <h1 className='title'>
                Invoice #{invoiceData.invoiceCode}
            </h1>
            <hr className='separator' />
        </div>

        <div>
            <p className='text'>
                Dated: {format(new Date(invoiceData.createdAt), 'EEE, do MMM yyyy, K:mm a')}
            </p>
        </div>

        <div>
            <h2 className='heading'>
                Billed To:
            </h2>
            <hr className='separator' />
            <p className='text mt-2'>
                {invoiceData.customerName}
            </p>
            <p className='text'>
                {invoiceData.customerEmail}
            </p>
            {
                invoiceData.businessName
                && <p className='text'>
                    {invoiceData.businessName}
                </p>
            }
        </div>

        <div>
            <h2 className='heading'>
                Total Due
            </h2>
            <hr className='separator' />
            <p className='text mt-2'>
                {invoiceData.paymentCurrency} {invoiceData.paymentAmount}
            </p>
        </div>

        {
            invoiceData.memo
            && <div>
                <h1 className='heading'>
                    Memo
                </h1>
                <hr className='separator' />
                <p className='text mt-2'>
                    {invoiceData.memo}
                </p>
            </div>
        }

        {
            invoiceData.memo
            && <div>
                <h1 className='heading'>
                    Status
                </h1>
                <hr className='separator' />
                <p className={classNames(
                    'font-bold text mt-2',
                    invoiceData.status === 'OPEN' ? 'text-sky-500' : '',
                    invoiceData.status === 'VIEWED' ? 'text-amber-500' : '',
                    invoiceData.status === 'PAID' ? 'text-emerald-500' : '',
                    invoiceData.status === 'UNRESOLVED' ? 'text-rose-500' : '',
                )}>
                    {invoiceData.status}
                </p>
            </div>
        }

        <div>
            <h1 className='heading'>
                Payment
            </h1>
            <hr className='separator' />
            <div className='my-4'>
                <a
                    href={invoiceData.invoiceUrl}
                    className='button'
                >
                    View / Pay
                </a>
            </div>
        </div>

    </div>
}