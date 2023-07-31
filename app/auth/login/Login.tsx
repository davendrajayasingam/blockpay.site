'use client'

import LoginWithEmail from '@/app/auth/login/LoginWithEmail'

type Props = {
    callbackUrl: string
}

export default function Login({ callbackUrl }: Props)
{
    return <LoginWithEmail callbackUrl={callbackUrl} />
}