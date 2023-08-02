import { COLLECTION_INVOICES } from '@/configs/fauna'
import { client, q } from '@/utils/helpers/faunaHelper'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest)
{
    const invoiceId = req.url.split('/').pop()
    if (!invoiceId)
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
        q.Delete(
            q.Ref(q.Collection(COLLECTION_INVOICES), invoiceId)
        )
    )

    return NextResponse.json('ok')
}