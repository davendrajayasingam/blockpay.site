import { COLLECTION_INVOICES } from '@/configs/fauna'
import { client, q } from '@/utils/helpers/faunaHelper'
import { NextRequest, NextResponse } from 'next/server'
import verifyApiRequest from '@/app/api/verifyApiRequest'
import createInvoiceSchema from '@/app/api/invoice/create/createInvoiceSchema'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest)
{
    const invoiceId = req.url.split('/').slice(-2)[0]
    if (!invoiceId)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    const body: CreateInvoiceData = await req.json()

    const verifiedApiRequest = await verifyApiRequest(body, createInvoiceSchema)
    if (!verifiedApiRequest)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    const token = await getToken({ req })
    const userId = token!.sub!

    const refExpr = q.Ref(q.Collection(COLLECTION_INVOICES), invoiceId)

    const invoiceData: InvoiceData = await client.query(
        q.If(
            q.Exists(refExpr),
            q.Select(['data'], q.Get(refExpr)),
            {}
        )
    )

    if (invoiceData.ownerId !== userId)
    {
        return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 })
    }

    await client.query(
        q.Update(
            q.Ref(q.Collection(COLLECTION_INVOICES), invoiceId),
            { data: body }
        )
    )

    return NextResponse.json('ok')
}