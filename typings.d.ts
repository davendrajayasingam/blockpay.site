type InvoiceData = CreateInvoiceData & {
    ownerId: string,
    invoiceId: string,
    status: InvoiceStatus,
    createdAt: string,
    updatedAt: string
}

type FiatCurrency = {
    id: string,
    name: string,
    minSize: number
}

type InvoiceStatus =
    'Confirmed' // paid
    | 'Created' // 
    | 'Delayed' //
    | 'Failed' // 
    | 'Pending' //
    | 'Resolved' //

type ChargeData = {
    // charge:confirmed
    // charge:created
    // charge:delayed
    // charge:failed
    // charge:pending
    // charge:resolved
    type: string,
    timestamp: string,
}