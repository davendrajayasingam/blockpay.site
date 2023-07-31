import { NextRequest, NextResponse } from 'next/server'

import faunaAdapterSetup from './faunaAdapterSetup'
import faunaHousekeepingSetup from './faunaHousekeepingSetup'

export async function GET(request: NextRequest)
{
    const logs: string[] = []

    await faunaAdapterSetup(logs)

    await faunaHousekeepingSetup(logs)

    return NextResponse.json(logs)
}