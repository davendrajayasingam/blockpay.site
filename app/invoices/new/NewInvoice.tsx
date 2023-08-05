'use client'

import { toast } from 'react-hot-toast'
import { useState } from 'react'
import axios from 'axios'

import SpinnerButton from '@/app/(ui)/SpinnerButton'

type Props = {
    fiatCurrencies: FiatCurrency[]
}

export default function NewInvoice({ fiatCurrencies }: Props)
{
    const [formData, setFormData] = useState<CreateInvoiceData>({
        paymentCurrency: 'MYR',
        paymentAmount: '',
        customerName: '',
        customerEmail: '',
        businessName: '',
        memo: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = () =>
    {
        const payload: any = { ...formData }

        if (!payload.customerName)
        {
            toast.error('Please enter a customer name')
            return
        }

        if (!payload.customerEmail)
        {
            toast.error('Please enter a customer email')
            return
        }

        if (!payload.paymentCurrency)
        {
            toast.error('Please select a currency')
            return
        }

        if (!payload.paymentAmount)
        {
            toast.error('Please enter an amount')
            return
        }

        try
        {
            // parsefloat to 2 decimal points
            payload.paymentAmount = parseFloat(Number(payload.paymentAmount).toFixed(2))
        }
        catch (err)
        {
            toast.error('Please enter a valid amount')
            return
        }

        setIsSubmitting(true)
        axios.post('/api/invoice/create', payload)
            .then(res => window.location.href = `/invoices/${res.data}`)
            .catch(err =>
            {
                toast.error('Something went wrong')
                setIsSubmitting(false)
            })
    }

    return (
        <form className='bg-black/10 border border-white/5 p-4 rounded-md shadow-md flex flex-col space-y-8'>

            {/* Customer Name */}
            <div>
                <label
                    htmlFor='customerName'
                    className='label'
                >
                    Customer Name <span className='text-rose-500'>*</span>
                </label>
                <input
                    type='text'
                    id='customerName'
                    className='input'
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                />
            </div>

            {/* Customer Email */}
            <div>
                <label
                    htmlFor='customerEmail'
                    className='label'
                >
                    Customer Email <span className='text-rose-500'>*</span>
                </label>
                <input
                    type='email'
                    id='customerEmail'
                    className='input'
                    value={formData.customerEmail}
                    onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                />
            </div>

            {/* Business Name */}
            <div>
                <label
                    htmlFor='businessName'
                    className='label'
                >
                    Business Name
                </label>
                <input
                    type='text'
                    id='businessName'
                    className='input'
                    value={formData.businessName}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                />
            </div>

            {/* Payment Currency */}
            <div>
                <label
                    htmlFor='paymentCurrency'
                    className='label'
                >
                    Payment <span className='text-rose-500'>*</span> <span className='text-xs'>
                        <br />
                        Minimum: {formData.paymentCurrency} {fiatCurrencies.find(currency => currency.id === formData.paymentCurrency)?.minSize}</span>
                </label>
                <div className='flex flex-row items-center space-x-4'>
                    <select
                        id='paymentCurrency'
                        className='input w-20 text-center'
                        value={formData.paymentCurrency}
                        onChange={e => setFormData({ ...formData, paymentCurrency: e.target.value })}
                    >
                        {
                            fiatCurrencies.map(currency => (
                                <option
                                    key={currency.id}
                                    value={currency.id}
                                >
                                    {currency.id}
                                </option>
                            ))
                        }
                    </select>
                    <input
                        type='text'
                        id='paymentAmount'
                        className='input grow'
                        value={formData.paymentAmount}
                        onChange={e => setFormData({ ...formData, paymentAmount: e.target.value })}
                    />
                </div>
            </div>

            {/* Memo */}
            <div>
                <label
                    htmlFor='memo'
                    className='label'
                >
                    Memo
                </label>
                <textarea
                    id='memo'
                    className='input'
                    rows={5}
                    value={formData.memo}
                    onChange={e => setFormData({ ...formData, memo: e.target.value })}
                />
            </div>

            <div>
                <SpinnerButton
                    type='submit'
                    showSpinner={isSubmitting}
                    onClick={handleSubmit}
                >
                    Create Invoice
                </SpinnerButton>
            </div>

        </form>
    )
}