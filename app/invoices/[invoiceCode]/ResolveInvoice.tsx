'use client'

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { LiaInfoCircleSolid } from 'react-icons/lia'

import DashboardDialog from '@/app/(ui)/DashboardDialog'

type Props = {
    status: string,
    invoiceCode: string
}

export default function ResolveInvoice({ status, invoiceCode }: Props)
{
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [resolved, setResolved] = useState(false)

    const handleResolveInvoice = () =>
    {
        setDialogIsOpen(false)

        const promise = axios.post(`/api/invoice/${invoiceCode}/resolve`)
            .then(() => setResolved(true))

        toast.promise(promise, {
            loading: 'Resolving invoice...',
            success: 'Invoice resolved successfully!',
            error: 'Something went wrong! Please try again.'
        })
    }

    if (status !== 'UNRESOLVED')
    {
        return null
    }

    if (resolved)
    {
        return <p className='text flex items-center space-x-2'>
            <LiaInfoCircleSolid className='text-2xl text-sky-500' />
            <span>Note: Invoice resolved successfully.</span>
        </p>
    }

    return <div className='flex flex-col space-y-4'>

        <h2 className='heading'>
            Resolve Invoice
        </h2>

        <p className='text'>
            View the timeline above to view the reason that this happened. Do not worry, we are here to help you resolve this issue. Choosing to resolve means that you accept the amount and mark the invoice as paid. If you choose not to resolve, do contact us with your request by filing a dispute.
        </p>

        <div>
            <button
                type='button'
                className='button'
                onClick={() => setDialogIsOpen(true)}
            >
                Resolve Invoice
            </button>
        </div>

        <DashboardDialog
            title='Resolve this invoice?'
            isOpen={dialogIsOpen}
            setIsOpen={setDialogIsOpen}
        >
            <p className='text text-center'>
                Choosing to resolve means that you accept the amount and mark the invoice as paid.
                <br />
                This action cannot be undone.
            </p>
            <div className='flex flex-row space-x-4 justify-evenly mt-8'>
                <button
                    type='button'
                    className='danger-button'
                    onClick={handleResolveInvoice}
                >
                    Resolve Invoice
                </button>
                <button
                    type='button'
                    className='button'
                    onClick={() => setDialogIsOpen(false)}
                >
                    Cancel
                </button>
            </div>
        </DashboardDialog>

    </div>
}