import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { client, q } from '@/utils/helpers/faunaHelper'
import { INDEX_INVOICES_BY_USERID } from '@/configs/fauna'

export async function GET(req: NextRequest)
{
    const token = await getToken({ req })
    const userId = token!.sub!

    const { data }: { data: InvoiceData[] } = await client.query(
        q.Map(
            q.Paginate(
                q.Match(q.Index(INDEX_INVOICES_BY_USERID), userId),
                { size: 10000 }
            ),
            q.Lambda('ref', q.Select(['data'], q.Get(q.Var('ref'))))
        )
    )

    return NextResponse.json(data)
}