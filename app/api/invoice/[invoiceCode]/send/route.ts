import { getToken } from 'next-auth/jwt'

import { INDEX_INVOICE_BY_INVOICE_CODE } from '@/configs/fauna'
import { client, q } from '@/utils/helpers/faunaHelper'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/utils/helpers/nodemailerHelper'
import { format } from 'date-fns'

export async function POST(req: NextRequest)
{
    const invoiceCode = req.url.split('/').slice(-2)[0]
    if (!invoiceCode)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    const token = await getToken({ req })
    const userId = token!.sub!
    const userEmail = token!.email!

    // get the invoice
    const matchExpr = q.Match(q.Index(INDEX_INVOICE_BY_INVOICE_CODE), invoiceCode)
    const invoiceData: InvoiceData = await client.query(
        q.If(
            q.Exists(matchExpr),
            q.Select(['data'], q.Get(matchExpr)),
            q.Abort('Invoice not found')
        )
    )

    if (invoiceData.ownerId !== userId)
    {
        return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 })
    }

    await sendEmail({
        to: [invoiceData.customerEmail],
        subject: `Invoice #${invoiceData.invoiceCode} for ${invoiceData.customerName}`,
        replyTo: userEmail,
        text: `Dear ${invoiceData.customerName},
        
We would like to bring to your attention an outstanding invoice that requires your prompt attention.

Invoice Details: #${invoiceData.memo}
Invoice Number: #${invoiceData.invoiceCode}
Invoice Date: ${format(new Date(invoiceData.createdAt), 'EEE, do MMM yyyy, K:mm a')}
Amount: ${invoiceData.paymentCurrency} ${invoiceData.paymentAmount}

We appreciate your continued business with us, and we strive to provide you with the best products/services in the industry. To ensure the seamless continuation of our services and to maintain a healthy business relationship, we kindly request that you settle the invoice amount at your earliest convenience.

You can conveniently make the payment through by visiting the following link: https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}/view/${invoiceData.invoiceCode}

If you have any questions or concerns regarding the invoice, need an extension for the payment, or require any further assistance, please don't hesitate to contact your merchant by replying to this email.

Thank you for your prompt attention to this matter.

Best regards,
The Blockpay Team`
    })

    return NextResponse.json('ok')
}