import { getToken } from 'next-auth/jwt'

import { INDEX_INVOICE_BY_INVOICE_CODE } from '@/configs/fauna'
import { client, q } from '@/utils/helpers/faunaHelper'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest)
{
    const invoiceCode = req.url.split('/').slice(-2)[0]
    if (!invoiceCode)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    const token = await getToken({ req })
    const userId = token!.sub!

    // get the invoice
    const matchExpr = q.Match(q.Index(INDEX_INVOICE_BY_INVOICE_CODE), invoiceCode)
    const ownerId: string = await client.query(
        q.If(
            q.Exists(matchExpr),
            q.Select(['data', 'ownerId'], q.Get(matchExpr)),
            q.Abort('Invoice not found')
        )
    )

    if (ownerId !== userId)
    {
        return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 })
    }

    await fetch(`https://api.commerce.coinbase.com/invoices/${invoiceCode}/resolve`, {
        method: 'PUT',
        headers: {
            'X-CC-Version': '2018-03-22',
            'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY!
        }
    })

    return NextResponse.json('ok')
}