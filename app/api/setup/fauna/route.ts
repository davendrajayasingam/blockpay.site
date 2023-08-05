import { NextRequest, NextResponse } from 'next/server'

import faunaAdapterSetup from './faunaAdapterSetup'
import faunaInvoicesSetup from './faunaInvoicesSetup'
import faunaWebhooksSetup from './faunaWebhooksSetup'

export async function GET(request: NextRequest)
{
    const logs: string[] = []

    await faunaAdapterSetup(logs)

    await faunaInvoicesSetup(logs)

    await faunaWebhooksSetup(logs)

    return NextResponse.json(logs)
}