import { COLLECTION_INVOICES } from '@/configs/fauna'
import { client, q } from '@/utils/helpers/faunaHelper'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest)
{
    const invoiceId = req.url.split('/').pop()
    if (!invoiceId)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    const refExpr = q.Ref(q.Collection(COLLECTION_INVOICES), invoiceId)

    const invoiceData = await client.query(
        q.If(
            q.Exists(refExpr),
            q.Select(['data'], q.Get(refExpr)),
            {}
        )
    )

    return NextResponse.json(invoiceData)
}