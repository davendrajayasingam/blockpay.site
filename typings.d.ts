type InvoiceItem = {
    name: string,
    description: string,
    quantity: number,
    price: number
}

type CreateInvoiceData = {
    // invoiceNumber: string
    // invoiceItems: InvoiceItem[]
    // invoiceIssueDate: string
    // paymentDueDate: string
    paymentCurrency: string
    paymentAmount: string
    customerName: string
    customerEmail: string
    businessName: string
    memo: string
}

type InvoiceData = CreateInvoiceData & {
    ownerId: string,
    invoiceId: string,
    invoiceCode: string,
    invoiceUrl: string,
    status: string,
    createdAt: string
}

type FiatCurrency = {
    id: string,
    name: string,
    minSize: number
}

type PaymentData = {
    createdAt: string,
    status: string,
    transactionId: string,
    net: {
        local: {
            amount: string,
            currency: string
        },
        crypto: {
            amount: string,
            currency: string
        }
    },
    timeline: TimelineData[]
}

type TimelineData = {
    time: string,
    status: string,
    context?: string,
    payment?: {
        value: {
            amount: string,
            currency: string
        },
        network: string,
        transactionId: string
    }
}