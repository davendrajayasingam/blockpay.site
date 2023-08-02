import DashboardLayout from '@/app/dashboard/DashboardLayout'
import ViewInvoice from './ViewInvoice'

type Props = {
    invoiceData: InvoiceData
}

export default function ManageInvoice({ invoiceData }: Props)
{
    return <div className='flex flex-col space-y-8'>

        <div>
            <h1 className='title'>
                Manage Invoice
            </h1>
            <hr className='separator' />
        </div>

        <div>
            <h2 className='heading'>
                Preview
            </h2>
            <hr className='separator' />
            <ViewInvoice invoiceData={invoiceData} />
        </div>

        <div>
            <h2 className='heading'>
                Payment
            </h2>
        </div>


    </div>
}