import { COLLECTION_INVOICES, INDEX_CHARGES_BY_INVOICEID } from '@/configs/fauna'
import { client, q } from '@/utils/helpers/faunaHelper'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest)
{
    const invoiceId = req.url.split('/').slice(-2)[0]

    const refExpr = q.Ref(q.Collection(COLLECTION_INVOICES), invoiceId)

    const invoiceData: InvoiceData = await client.query(
        q.If(
            q.Exists(refExpr),
            q.Select(['data'], q.Get(refExpr)),
            {}
        )
    )

    if (Object.keys(invoiceData).length === 0)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    // cancel any previous charges
    // const charges: { data: any[] } = await client.query(
    //     q.Map(
    //         q.Paginate(q.Match(q.Index(INDEX_CHARGES_BY_INVOICEID), invoiceId), { size: 10000 }),
    //         q.Lambda('chargeRef', q.Select(['data'], q.Get(q.Var('chargeRef'))))
    //     )
    // )
    // get the last charge
    // const lastChargeCreated = charges.data.reverse().find(charge => charge.event.type === 'charge:created')
    // if (lastChargeCreated)
    // {
    //     const lastChargeCode = lastChargeCreated?.event?.data?.code
    //     await fetch(`https://api.commerce.coinbase.com/charges/${lastChargeCode}/cancel`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'X-CC-Version': '2018-03-22',
    //             'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY!
    //         }
    //     })
    // }

    // create a new charge
    // const coinbaseCharge = {
    //     pricing_type: 'fixed_price',
    //     local_price: {
    //         amount: invoiceData.paymentAmount,
    //         currency: invoiceData.paymentCurrency
    //     },
    //     metadata: {
    //         invoiceId
    //     },
    //     name: invoiceData.customerName,
    //     description: invoiceData.memo,
    //     cancel_url: `${process.env.VERCEL_URL || process.env.NEXTAUTH_URL}/dashboard/invoices/${invoiceId}`,
    //     redirect_url: `${process.env.VERCEL_URL || process.env.NEXTAUTH_URL}/dashboard/invoices/${invoiceId}`
    // }

    // const { data } = await fetch('https://api.commerce.coinbase.com/charges', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'X-CC-Version': '2018-03-22',
    //         'X-CC-Api-Key': process.env.COINBASE_COMMERCE_API_KEY!
    //     },
    //     body: JSON.stringify(coinbaseCharge)
    // })
    //     .then(res => res.json())

    // const payload = {
    //     redirectUrl: data.hosted_url
    // }

    return NextResponse.json(payload)
}