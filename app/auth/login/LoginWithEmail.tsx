import { useState } from 'react'
import { signIn } from 'next-auth/react'

import { isValidEmail } from '@/utils/helpers/authHelper'
import DashboardSpinnerButton from '@/app/(ui)/DashboardSpinnerButton'
import DashboardTextInput from '@/app/(ui)/DashboardTextInput'

type Props = {
    callbackUrl: string
}

export default function LoginWithEmail({ callbackUrl }: Props)
{
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const handleLogin = () =>
    {
        // validate the email to make sure it's valid
        if (!isValidEmail(email))
        {
            setMessage('Please enter a valid email')
            return
        }

        setMessage('')
        setIsSubmitting(true)

        signIn('email', { email, callbackUrl })
            .catch(err =>
            {
                setMessage(err.message)
                setIsSubmitting(false)
            })
    }

    return (
        <div className='p-4 flex flex-col items-center justify-center space-y-8 w-screen h-screen'>

            <h1 className='font-primary text-teal-500 text-4xl'>
                Login
            </h1>

            <form className='w-80 mt-4 flex flex-col items-center justify-center space-y-4'>

                <DashboardTextInput
                    type='email'
                    placeholder='you@email.com'
                    required
                    value={email}
                    onChange={value =>
                    {
                        setEmail(value)
                        setMessage('')
                    }}
                    textPosition='center'
                />

                <DashboardSpinnerButton
                    type='submit'
                    fullWidth
                    showSpinner={isSubmitting}
                    onClick={handleLogin}
                >
                    Login with Email
                </DashboardSpinnerButton>

                {
                    message
                    && <p className='font-medium text-sm text-rose-500 animate-shake'>
                        {message}
                    </p>
                }

            </form>

        </div>
    )
}