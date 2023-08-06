import { getToken } from 'next-auth/jwt'

import { NextRequest, NextResponse } from 'next/server'
import verifyApiRequest from '@/app/api/verifyApiRequest'
import { sendEmail } from '@/utils/helpers/nodemailerHelper'

import schema from './contactSchema'

export async function POST(req: NextRequest)
{
    const body = await req.json()

    const verifiedApiRequest = await verifyApiRequest(body, schema)
    if (!verifiedApiRequest)
    {
        return NextResponse.json({ message: 'Invalid arguments!' }, { status: 400 })
    }

    // get the user details
    const token = await getToken({ req })
    const userId = token!.sub!
    const userEmail = token!.email!

    const { invoiceCode, subject, message } = body

    await sendEmail({
        to: [process.env.SUPPORT_EMAIL!],
        subject: `Support: ${subject}`,
        replyTo: userEmail,
        text: `${message}. User ID: ${userId}. User email: ${userEmail}. ${invoiceCode ? `Invoice code: ${invoiceCode}` : ''}`
    })

    return NextResponse.json({ message: 'Sent!' })
}