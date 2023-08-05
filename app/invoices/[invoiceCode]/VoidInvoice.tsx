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

export default function VoidInvoice({ status, invoiceCode }: Props)
{
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [voided, setVoided] = useState(false)

    const handleVoidInvoice = () =>
    {
        setDialogIsOpen(false)

        const promise = axios.post(`/api/invoice/${invoiceCode}/void`)
            .then(() => setVoided(true))

        toast.promise(promise, {
            loading: 'Voiding invoice...',
            success: 'Invoice voided successfully!',
            error: 'Something went wrong! Please try again.'
        })
    }

    if (status === 'VOID')
    {
        return <p className='text flex items-center space-x-2'>
            <LiaInfoCircleSolid className='text-2xl text-sky-500' />
            <span>Note: This invoice is VOID.</span>
        </p>
    }

    if (voided || (status !== 'OPEN' && status !== 'VIEWED'))
    {
        return <p className='text flex items-center space-x-2'>
            <LiaInfoCircleSolid className='text-2xl text-sky-500' />
            <span>Note: This invoice cannot be voided. Only invoices with OPEN or VIEWED status can be voided. Once a payment is detected, the invoice can no longer be voided.</span>
        </p>
    }

    return <div className='flex flex-col space-y-4'>

        <h2 className='heading'>
            Void Invoice
        </h2>

        <p className='text'>
            Once a payment is detected, the invoice can no longer be voided.
        </p>

        <div>
            <button
                type='button'
                className='danger-button'
                onClick={() => setDialogIsOpen(true)}
            >
                Void Invoice
            </button>
        </div>

        <DashboardDialog
            title='Void this invoice?'
            isOpen={dialogIsOpen}
            setIsOpen={setDialogIsOpen}
        >
            <p className='text text-center'>
                Voiding this invoice will prevent it from being paid.
                <br />
                This action cannot be undone.
            </p>
            <div className='flex flex-row space-x-4 justify-evenly mt-8'>
                <button
                    type='button'
                    className='danger-button'
                    onClick={handleVoidInvoice}
                >
                    Void Invoice
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