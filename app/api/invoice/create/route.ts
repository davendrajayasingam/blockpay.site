import { getToken } from 'next-auth/jwt'

import { NextRequest, NextResponse } from 'next/server'
import verifyApiRequest from '@/app/api/verifyApiRequest'
import { client, q } from '@/utils/helpers/faunaHelper'
import { COLLECTION_INVOICES } from '@/configs/fauna'

import schema from './createInvoiceSchema'

export async function POST(req: NextRequest)
{
    const body: CreateInvoiceData = await req.json()

    const verifiedApiRequest = await verifyApiRequest(body, schema)
    if (!verifiedApiRequest)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    const token = await getToken({ req })
    const userId = token!.sub!

    // create the coinbase invoice
    const coinbaseInvoiceData = {
        business_name: body.businessName,
        customer_email: body.customerEmail,
        customer_name: body.customerName,
        memo: body.memo,
        local_price: {
            currency: body.paymentCurrency,
            amount: body.paymentAmount
        }
    }

    // create a new coinbase invoice
    const coinbaseResponse = await fetch('https://api.commerce.coinbase.com/invoices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CC-Version': '2018-03-22',
            'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY!
        },
        body: JSON.stringify(coinbaseInvoiceData)
    })
        .then(res => res.json())

    const { id, code, hosted_url, status } = coinbaseResponse.data

    const invoiceData: InvoiceData = {
        ownerId: userId,
        invoiceId: id,
        invoiceCode: code,
        invoiceUrl: hosted_url,
        status,
        createdAt: new Date().toISOString(),
        paymentCurrency: body.paymentCurrency,
        paymentAmount: body.paymentAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        businessName: body.businessName,
        memo: body.memo
    }

    await client.query(
        q.Create(
            q.Collection(COLLECTION_INVOICES),
            { data: invoiceData }
        )
    )

    return NextResponse.json(code, { status: 200 })
}