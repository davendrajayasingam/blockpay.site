import { NextRequest, NextResponse } from 'next/server'
import { INDEX_INVOICE_BY_INVOICE_CODE } from '@/configs/fauna'
import { client, q } from '@/utils/helpers/faunaHelper'

export async function GET(req: NextRequest)
{
    const invoiceCode = req.url.split('/').pop()
    if (!invoiceCode)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    const matchExpr = q.Match(
        q.Index(INDEX_INVOICE_BY_INVOICE_CODE),
        invoiceCode
    )

    const invoiceData = await client.query(
        q.If(
            q.Exists(matchExpr),
            q.Select(['data'], q.Get(matchExpr)),
            {}
        )
    )

    return NextResponse.json(invoiceData)
}