import { getToken } from 'next-auth/jwt'

import { NextRequest, NextResponse } from 'next/server'
import { client, q } from '@/utils/helpers/faunaHelper'
import { INDEX_INVOICE_BY_INVOICE_CODE, INDEX_WEBHOOK_EVENTS_BY_INVOICE_CODE } from '@/configs/fauna'

export async function GET(req: NextRequest)
{
    const invoiceCode = req.url.split('/').slice(-2)[0]
    if (!invoiceCode)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    // make sure the invoice owner is the current user
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

    const response: { data: any[] } = await client.query(
        q.Map(
            q.Paginate(
                q.Match(q.Index(INDEX_WEBHOOK_EVENTS_BY_INVOICE_CODE), invoiceCode),
                { size: 10000 }
            ),
            q.Lambda('webhookRef', q.Select(['data'], q.Get(q.Var('webhookRef'))))
        )
    )

    const allPayments: PaymentData[] = response.data.reduce((acc, webhook) =>
    {
        const payments = webhook?.event?.data?.charge?.payments
        const timeline = webhook?.event?.data?.charge?.timeline

        if (payments?.[0])
        {
            acc.push(...payments.map((payment: any) => ({
                createdAt: payment.detected_at,
                status: payment.status,
                transactionId: payment.transaction_id,
                net: payment.net,
                timeline: (timeline || []).map((timelineItem: any) => ({
                    time: timelineItem.time,
                    status: timelineItem.status,
                    context: timelineItem.context || '',
                    payment: {
                        value: {
                            amount: timelineItem.payment?.value?.amount || '',
                            currency: timelineItem.payment?.value?.currency || ''
                        },
                        network: timelineItem.payment?.network || '',
                        transactionId: timelineItem.payment?.transaction_id || ''
                    }
                }))
            })))
        }
        return acc
    }, [])

    return NextResponse.json(allPayments)
}