import { NextRequest, NextResponse } from 'next/server'

import faunaAdapterSetup from './faunaAdapterSetup'
import faunaHousekeepingSetup from './faunaHousekeepingSetup'
import faunaInvoicesSetup from './faunaInvoicesSetup'
import faunaChargesSetup from './faunaChargesSetup'

export async function GET(request: NextRequest)
{
    const logs: string[] = []

    await faunaAdapterSetup(logs)

    await faunaHousekeepingSetup(logs)

    await faunaInvoicesSetup(logs)

    await faunaChargesSetup(logs)

    return NextResponse.json(logs)
}