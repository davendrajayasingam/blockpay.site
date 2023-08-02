import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import verifyApiRequest from '@/app/api/verifyApiRequest'
import { client, q } from '@/utils/helpers/faunaHelper'

import createInvoiceSchema from './createInvoiceSchema'
import { COLLECTION_INVOICES } from '@/configs/fauna'

export async function POST(req: NextRequest)
{
    const body: CreateInvoiceData = await req.json()

    const verifiedApiRequest = await verifyApiRequest(body, createInvoiceSchema)
    if (!verifiedApiRequest)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    const token = await getToken({ req })
    const userId = token!.sub!

    const invoiceId: string = await client.query(q.NewId())

    const invoiceData: InvoiceData = {
        ownerId: userId,
        invoiceId,
        status: 'Created',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        paymentCurrency: body.paymentCurrency,
        paymentAmount: body.paymentAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        businessName: body.businessName,
        memo: body.memo
    }

    await client.query(
        q.Create(
            q.Ref(q.Collection(COLLECTION_INVOICES), invoiceId),
            { data: invoiceData }
        )
    )

    return NextResponse.json(invoiceId, { status: 200 })
}