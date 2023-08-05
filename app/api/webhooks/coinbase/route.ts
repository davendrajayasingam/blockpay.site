import { NextRequest, NextResponse } from 'next/server'
import { client, q } from '@/utils/helpers/faunaHelper'
import { COLLECTION_WEBHOOKS, INDEX_INVOICE_BY_INVOICE_CODE } from '@/configs/fauna'

import verifyCoinbaseWebhookSignature from './verifyCoinbaseWebhookSignature'

export async function POST(req: NextRequest)
{
    const body = await req.json()

    // verify the webhook signature
    const verifiedRequest = await verifyCoinbaseWebhookSignature(req, JSON.stringify(body))
    if (!verifiedRequest)
    {
        return NextResponse.json('Invalid signature', { status: 403 })
    }

    const type = body?.event?.type || ''
    const { code } = body?.event?.data

    // Add the webhook to the database
    await client.query(
        q.Create(
            q.Collection(COLLECTION_WEBHOOKS),
            {
                data: {
                    invoiceCode: code,
                    ...body
                }
            }
        )
    )

    if (type.startsWith('invoice:'))
    {
        const status = body?.event?.data?.status

        // Update the status of the invoice
        const matchExpr = q.Match(q.Index(INDEX_INVOICE_BY_INVOICE_CODE), code)
        await client.query(
            q.If(
                q.Exists(matchExpr),
                q.Update(
                    q.Select(['ref'], q.Get(matchExpr)),
                    { data: { status } }
                ),
                q.Abort('Invoice not found')
            )
        )
    }

    return NextResponse.json('ok')
}

// Reference: https://docs.cloud.coinbase.com/commerce/reference/

// Invoice Created {
//     "attempt_number": 1,
//     "event": {
//         "api_version": "2018-03-22",
//         "created_at": "2020-12-04T07:28:43Z",
//         "data": {
//             "id": "00000000-0000-0000-0000-000000000000",
//             "memo": "this is the memo",
//             "status": "OPEN",
//             "short_code": "AAAAAAAA",
//             "local_price": {
//                 "amount": "1.00",
//                 "currency": "USD"
//             },
//             "business_name": "Acme Labs",
//             "customer_name": "Jon BonJovi",
//             "customer_email": "jon@bonjovi.com"
//         },
//         "id": "00000000-0000-0000-0000-000000000000",
//         "resource": "event",
//         "type": "invoice:created"
//     },
//     "id": "00000000-0000-0000-0000-000000000000",
//     "scheduled_for": "2020-12-04T07:28:43Z"
// }

// Invoice Viewed {
//     "attempt_number": 1,
//     "event": {
//         "api_version": "2018-03-22",
//         "created_at": "2020-12-04T07:23:33Z",
//         "data": {
//             "id": "00000000-0000-0000-0000-000000000000",
//             "memo": "this is the memo",
//             "status": "VIEWED",
//             "short_code": "AAAAAAAA",
//             "local_price": {
//                 "amount": "1.00",
//                 "currency": "USD"
//             },
//             "business_name": "Acme Labs",
//             "customer_name": "Jon BonJovi",
//             "customer_email": "jon@bonjovi.com"
//         },
//         "id": "00000000-0000-0000-0000-000000000000",
//         "resource": "event",
//         "type": "invoice:viewed"
//     },
//     "id": "00000000-0000-0000-0000-000000000000",
//     "scheduled_for": "2020-12-04T07:23:33Z"
// }

// Invoice Payment Pending {
//     "attempt_number": 1,
//     "event": {
//         "api_version": "2018-03-22",
//         "created_at": "2020-12-04T07:22:24Z",
//         "data": {
//             "id": "00000000-0000-0000-0000-000000000000",
//             "memo": "this is the memo",
//             "status": "PAYMENT_PENDING",
//             "short_code": "AAAAAAAA",
//             "local_price": {
//                 "amount": "1.00",
//                 "currency": "USD"
//             },
//             "business_name": "Acme Labs",
//             "customer_name": "Jon BonJovi",
//             "customer_email": "jon@bonjovi.com"
//         },
//         "id": "00000000-0000-0000-0000-000000000000",
//         "resource": "event",
//         "type": "invoice:payment_pending"
//     },
//     "id": "00000000-0000-0000-0000-000000000000",
//     "scheduled_for": "2020-12-04T07:22:24Z"
// }

// Invoice Paid {
//     "attempt_number": 1,
//     "event": {
//         "api_version": "2018-03-22",
//         "created_at": "2020-12-04T07:19:52Z",
//         "data": {
//             "id": "00000000-0000-0000-0000-000000000000",
//             "memo": "this is the memo",
//             "status": "PAID",
//             "short_code": "AAAAAAAA",
//             "local_price": {
//                 "amount": "1.00",
//                 "currency": "USD"
//             },
//             "business_name": "Acme Labs",
//             "customer_name": "Jon BonJovi",
//             "customer_email": "jon@bonjovi.com"
//         },
//         "id": "00000000-0000-0000-0000-000000000000",
//         "resource": "event",
//         "type": "invoice:paid"
//     },
//     "id": "00000000-0000-0000-0000-000000000000",
//     "scheduled_for": "2020-12-04T07:19:52Z"
// }

// Invoice Unresolved {
//     "attempt_number": 1,
//     "event": {
//         "api_version": "2018-03-22",
//         "created_at": "2020-12-04T07:21:49Z",
//         "data": {
//             "id": "00000000-0000-0000-0000-000000000000",
//             "memo": "this is the memo",
//             "status": "UNRESOLVED",
//             "short_code": "AAAAAAAA",
//             "local_price": {
//                 "amount": "1.00",
//                 "currency": "USD"
//             },
//             "business_name": "Acme Labs",
//             "customer_name": "Jon BonJovi",
//             "customer_email": "jon@bonjovi.com"
//         },
//         "id": "00000000-0000-0000-0000-000000000000",
//         "resource": "event",
//         "type": "invoice:unresolved"
//     },
//     "id": "00000000-0000-0000-0000-000000000000",
//     "scheduled_for": "2020-12-04T07:21:49Z"
// }

// Invoice Voided {
//     "attempt_number": 1,
//     "event": {
//         "api_version": "2018-03-22",
//         "created_at": "2020-12-04T07:21:04Z",
//         "data": {
//             "id": "00000000-0000-0000-0000-000000000000",
//             "memo": "this is the memo",
//             "status": "VOID",
//             "short_code": "AAAAAAAA",
//             "local_price": {
//                 "amount": "1.00",
//                 "currency": "USD"
//             },
//             "business_name": "Acme Labs",
//             "customer_name": "Jon BonJovi",
//             "customer_email": "jon@bonjovi.com"
//         },
//         "id": "00000000-0000-0000-0000-000000000000",
//         "resource": "event",
//         "type": "invoice:voided"
//     },
//     "id": "00000000-0000-0000-0000-000000000000",
//     "scheduled_for": "2020-12-04T07:21:04Z"
// }