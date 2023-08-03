import { COLLECTION_INVOICES, INDEX_CHARGES_BY_INVOICEID } from '@/configs/fauna'
import { client, q } from '@/utils/helpers/faunaHelper'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest)
{
    const invoiceId = req.url.split('/').slice(-2)[0]
    if (!invoiceId)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    const refExpr = q.Match(
        q.Index(INDEX_CHARGES_BY_INVOICEID),
        invoiceId
    )

    const charges: { data: any[] } = await client.query(
        q.Map(
            q.Paginate(refExpr, { size: 10000 }),
            q.Lambda('chargeRef', q.Select(['data'], q.Get(q.Var('chargeRef'))))
        )
    )

    const payload: ChargeData[] = charges.data.map((charge: any) => ({
        type: (charge?.event?.type || 'charge:unknown') as string,
        timestamp: (charge?.event?.created_at || '') as string
    }))

    return NextResponse.json(payload)
}