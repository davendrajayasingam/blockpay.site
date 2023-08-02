import { NextRequest, NextResponse } from 'next/server'
import verifyWebhookSignature from './verifyWebhookSignature'
import { client, q } from '@/utils/helpers/faunaHelper'
import { COLLECTION_CHARGES, COLLECTION_INVOICES } from '@/configs/fauna'

export async function POST(req: NextRequest)
{
    const body = await req.json()

    // verify the webhook signature
    const verifiedRequest = await verifyWebhookSignature(req, JSON.stringify(body))
    if (!verifiedRequest)
    {
        return NextResponse.json('Invalid signature', { status: 403 })
    }

    const type = body?.event?.type
    const invoiceId = body?.event?.data?.metadata?.invoiceId

    if (!type || !invoiceId)
    {
        console.error('Could not find type or invoiceId in the request body', JSON.stringify(body))
        return NextResponse.json('ok')
    }

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

    const payload = {
        type,
        invoiceId,
        ownerId: invoiceData.ownerId,
        ...body
    }

    await client.query(
        q.Create(
            q.Collection(COLLECTION_CHARGES),
            { data: payload }
        )
    )

    return NextResponse.json('ok')
}

// Reference: https://docs.cloud.coinbase.com/commerce/reference/

// Example for charge:confirmed {
//     id: '00000000-0000-0000-0000-000000000000',
//     scheduled_for: '2018-01-01T00:40:00Z',
//     attempt_number: 1,
//     event: {
//       id: '00000000-0000-0000-0000-000000000000',
//       resource: 'event',
//       type: 'charge:confirmed',
//       api_version: '2018-03-22',
//       created_at: '2018-01-01T00:40:00Z',
//       data: {
//         code: 'AAAAAAAA',
//         id: '00000000-0000-0000-0000-000000000000',
//         resource: 'charge',
//         name: 'The Sovereign Individual',
//         description: 'Mastering the Transition to the Information Age',
//         hosted_url: 'https://commerce.coinbase.com/charges/AAAAAAAA',
//         created_at: '2018-01-01T00:00:00Z',
//         confirmed_at: '2018-01-01T00:40:00Z',
//         expires_at: '2018-01-01T01:00:00Z',
//         support_email: 'test@test.test',
//         timeline: [Array],
//         metadata: {},
//         payment_threshold: [Object],
//         pricing: [Object],
//         pricing_type: 'fixed_price',
//         payments: [Array],
//         addresses: [Object],
//         exchange_rates: [Object],
//         local_exchange_rates: [Object],
//         pwcb_only: false,
//         offchain_eligible: false,
//         coinbase_managed_merchant: false,
//         fee_rate: 0.01
//       }
//     }
//   }

// Example for charge:created {
//     id: '00000000-0000-0000-0000-000000000000',
//     scheduled_for: '2018-01-01T00:00:00Z',
//     attempt_number: 1,
//     event: {
//       id: '00000000-0000-0000-0000-000000000000',
//       resource: 'event',
//       type: 'charge:created',
//       api_version: '2018-03-22',
//       created_at: '2018-01-01T00:00:00Z',
//       data: {
//         code: 'AAAAAAAA',
//         id: '00000000-0000-0000-0000-000000000000',
//         resource: 'charge',
//         name: 'The Sovereign Individual',
//         description: 'Mastering the Transition to the Information Age',
//         hosted_url: 'https://commerce.coinbase.com/charges/AAAAAAAA',
//         created_at: '2018-01-01T00:00:00Z',
//         expires_at: '2018-01-01T01:00:00Z',
//         support_email: 'test@test.test',
//         timeline: [Array],
//         metadata: {},
//         payment_threshold: [Object],
//         pricing: [Object],
//         pricing_type: 'fixed_price',
//         payments: [],
//         addresses: [Object],
//         exchange_rates: [Object],
//         local_exchange_rates: [Object],
//         pwcb_only: false,
//         offchain_eligible: false,
//         coinbase_managed_merchant: false,
//         fee_rate: 0.01
//       }
//     }
//   }

// Example for charge:delayed {
//     id: '00000000-0000-0000-0000-000000000000',
//     scheduled_for: '2018-01-02T00:00:00Z',
//     attempt_number: 1,
//     event: {
//       id: '00000000-0000-0000-0000-000000000000',
//       resource: 'event',
//       type: 'charge:delayed',
//       api_version: '2018-03-22',
//       created_at: '2018-01-02T00:00:00Z',
//       data: {
//         code: 'AAAAAAAA',
//         id: '00000000-0000-0000-0000-000000000000',
//         resource: 'charge',
//         name: 'The Sovereign Individual',
//         description: 'Mastering the Transition to the Information Age',
//         hosted_url: 'https://commerce.coinbase.com/charges/AAAAAAAA',
//         created_at: '2018-01-01T00:00:00Z',
//         expires_at: '2018-01-01T01:00:00Z',
//         support_email: 'test@test.test',
//         timeline: [Array],
//         metadata: {},
//         payment_threshold: [Object],
//         pricing: [Object],
//         pricing_type: 'fixed_price',
//         payments: [Array],
//         addresses: [Object],
//         exchange_rates: [Object],
//         local_exchange_rates: [Object],
//         pwcb_only: false,
//         offchain_eligible: false,
//         coinbase_managed_merchant: false,
//         fee_rate: 0.01
//       }
//     }
//   }

// Example for charge:failed {
//     id: '00000000-0000-0000-0000-000000000000',
//     scheduled_for: '2018-01-01T01:00:00Z',
//     attempt_number: 1,
//     event: {
//       id: '00000000-0000-0000-0000-000000000000',
//       resource: 'event',
//       type: 'charge:failed',
//       api_version: '2018-03-22',
//       created_at: '2018-01-01T01:00:00Z',
//       data: {
//         code: 'AAAAAAAA',
//         id: '00000000-0000-0000-0000-000000000000',
//         resource: 'charge',
//         name: 'The Sovereign Individual',
//         description: 'Mastering the Transition to the Information Age',
//         hosted_url: 'https://commerce.coinbase.com/charges/AAAAAAAA',
//         created_at: '2018-01-01T00:00:00Z',
//         expires_at: '2018-01-01T01:00:00Z',
//         support_email: 'test@test.test',
//         timeline: [Array],
//         metadata: {},
//         payment_threshold: [Object],
//         pricing: [Object],
//         pricing_type: 'fixed_price',
//         payments: [],
//         addresses: [Object],
//         exchange_rates: [Object],
//         local_exchange_rates: [Object],
//         pwcb_only: false,
//         offchain_eligible: false,
//         coinbase_managed_merchant: false,
//         fee_rate: 0.01
//       }
//     }
//   }

// Example for charge:pending {
//     id: '00000000-0000-0000-0000-000000000000',
//     scheduled_for: '2018-01-01T00:30:00Z',
//     attempt_number: 1,
//     event: {
//       id: '00000000-0000-0000-0000-000000000000',
//       resource: 'event',
//       type: 'charge:pending',
//       api_version: '2018-03-22',
//       created_at: '2018-01-01T00:30:00Z',
//       data: {
//         code: 'AAAAAAAA',
//         id: '00000000-0000-0000-0000-000000000000',
//         resource: 'charge',
//         name: 'The Sovereign Individual',
//         description: 'Mastering the Transition to the Information Age',
//         hosted_url: 'https://commerce.coinbase.com/charges/AAAAAAAA',
//         created_at: '2018-01-01T00:00:00Z',
//         expires_at: '2018-01-01T01:00:00Z',
//         support_email: 'test@test.test',
//         timeline: [Array],
//         metadata: {},
//         payment_threshold: [Object],
//         pricing: [Object],
//         pricing_type: 'fixed_price',
//         payments: [Array],
//         addresses: [Object],
//         exchange_rates: [Object],
//         local_exchange_rates: [Object],
//         pwcb_only: false,
//         offchain_eligible: false,
//         coinbase_managed_merchant: false,
//         fee_rate: 0.01
//       }
//     }
//   }

// Exmaple for charge:resolved {
//     id: '00000000-0000-0000-0000-000000000000',
//     scheduled_for: '2018-01-02T00:00:00Z',
//     attempt_number: 1,
//     event: {
//       id: '00000000-0000-0000-0000-000000000000',
//       resource: 'event',
//       type: 'charge:resolved',
//       api_version: '2018-03-22',
//       created_at: '2018-01-02T00:00:00Z',
//       data: {
//         code: 'AAAAAAAA',
//         id: '00000000-0000-0000-0000-000000000000',
//         resource: 'charge',
//         name: 'The Sovereign Individual',
//         description: 'Mastering the Transition to the Information Age',
//         hosted_url: 'https://commerce.coinbase.com/charges/AAAAAAAA',
//         created_at: '2018-01-01T00:00:00Z',
//         expires_at: '2018-01-01T01:00:00Z',
//         support_email: 'test@test.test',
//         timeline: [Array],
//         metadata: {},
//         payment_threshold: [Object],
//         applied_threshold: [Object],
//         applied_threshold_type: 'ABSOLUTE',
//         pricing: [Object],
//         pricing_type: 'fixed_price',
//         payments: [Array],
//         addresses: [Object],
//         pwcb_only: false,
//         fee_rate: 0.01
//       }
//     }
//   }