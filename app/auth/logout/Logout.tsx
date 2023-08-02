'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import Spinner from '@/app/(ui)/Spinner'

export default function Logout()
{
    useEffect(() => 
    {
        signOut({ callbackUrl: '/' })
    }, [])

    return (
        <div className='p-4 flex flex-col items-center justify-center space-y-8 w-screen h-screen'>

            <div className='w-80 text-center'>
                <h1 className='font-bold text-teal-500 text-4xl'>
                    <span>Logging out</span>
                    <span><Spinner /></span>
                </h1>
                <h2 className='mt-2 font-medium text-lg text-center text-slate-700'>
                    You will be automatically redirected to the home page in a few seconds.
                </h2>
            </div>

        </div>
    )
}