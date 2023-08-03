import ViewInvoice from './ViewInvoice'
import ViewPayments from './ViewPayments'

type Props = {
    invoiceData: InvoiceData,
    chargesData: ChargeData[]
}

export default function ManageInvoice({ invoiceData, chargesData }: Props)
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
            <hr className='separator mt-2 mb-4' />
            <ViewInvoice invoiceData={invoiceData} />
        </div>

        <div>
            <h2 className='heading'>
                Payments
            </h2>
            <hr className='separator mt-2 mb-4' />
            <ViewPayments chargesData={chargesData} />
        </div>


    </div>
}