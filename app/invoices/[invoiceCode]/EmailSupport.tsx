'use client'

import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import SpinnerButton from '@/app/(ui)/SpinnerButton'

type Props = {
    invoiceCode?: string
}

export default function EmailSupport({ invoiceCode }: Props)
{
    const [formData, setFormData] = useState({
        invoiceCode: invoiceCode || '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [emailSent, setEmailSent] = useState(false)

    const handleSubmit = async () =>
    {
        if (!formData.subject)
        {
            toast.error('Please enter a subject.')
            return
        }

        if (!formData.message)
        {
            toast.error('Please enter a message.')
            return
        }

        setIsSubmitting(true)
        const promise = axios.post('/api/contact', formData)
            .then(() => setEmailSent(true))
            .finally(() => setIsSubmitting(false))

        toast.promise(promise, {
            loading: 'Sending email...',
            success: 'Email sent successfully!',
            error: 'Something went wrong! Please try again.'
        })
    }

    return <div className='flex flex-col space-y-4 p-4 bg-black/10 rounded-md border border-white/10'>

        <h2 className='heading'>
            Email Support
        </h2>

        <p className='text'>
            Fill in the form below with your request. You may want to issue refunds, or withdraw your earnings. We will get back to you within 24 hours.
        </p>

        <form className='flex flex-col space-y-4'>

            <div>
                <label
                    htmlFor='subject'
                    className='label'
                >
                    Subject <span className='text-rose-500'>*</span>
                </label>
                <input
                    type='text'
                    id='subject'
                    className='input'
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                />
            </div>

            {/* Message */}
            <div>
                <label
                    htmlFor='message'
                    className='label'
                >
                    Message <span className='text-rose-500'>*</span>
                </label>
                <textarea
                    id='message'
                    className='input'
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
            </div>

            <div>
                <SpinnerButton
                    type='submit'
                    showSpinner={isSubmitting}
                    onClick={handleSubmit}
                    disabled={emailSent}
                >
                    Submit
                </SpinnerButton>
            </div>

        </form>

    </div>
}