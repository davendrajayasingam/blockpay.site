import EmailSupport from './EmailSupport'
import ResolveInvoice from './ResolveInvoice'
import SendInvoice from './SendInvoice'
import ViewInvoice from './ViewInvoice'
import ViewPayments from './ViewPayments'
import ViewTimeline from './ViewTimeline'
import VoidInvoice from './VoidInvoice'

type Props = {
    invoiceData: InvoiceData,
    paymentsData: PaymentData[]
}

export default function ManageInvoice({ invoiceData, paymentsData }: Props)
{
    return <div className='flex flex-col space-y-8'>

        <div>
            <h1 className='title'>
                Preview
            </h1>
            <hr className='separator mt-2 mb-4' />
            <ViewInvoice invoiceData={invoiceData} />
        </div>

        <div>
            <h1 className='title'>
                Timeline
            </h1>
            <hr className='separator mt-2 mb-4' />
            <ViewTimeline paymentsData={paymentsData} />
        </div>

        <div>
            <h1 className='title'>
                Payments
            </h1>
            <hr className='separator mt-2 mb-4' />
            <ViewPayments paymentsData={paymentsData} />
        </div>

        <div>
            <h1 className='title'>
                Actions
            </h1>
            <hr className='separator mt-2 mb-4' />
            <div className='flex flex-col space-y-8'>
                <SendInvoice
                    customerName={invoiceData.customerName}
                    invoiceCode={invoiceData.invoiceCode}
                    status={invoiceData.status}
                />
                <ResolveInvoice
                    invoiceCode={invoiceData.invoiceCode}
                    status={invoiceData.status}
                />
                <EmailSupport invoiceCode={invoiceData.invoiceCode} />
                <VoidInvoice
                    invoiceCode={invoiceData.invoiceCode}
                    status={invoiceData.status}
                />
            </div>
        </div>

    </div>
}