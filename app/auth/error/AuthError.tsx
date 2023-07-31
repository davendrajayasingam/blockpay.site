import DashboardLink from '@/app/(ui)/DashboardLink'
import { pathToLogin } from '@/configs/pageRoutes'

export default function AuthError({ errorCode }: { errorCode: string })
{
    const getErrorTitle = (errorCode: string) =>
    {
        switch (errorCode)
        {
            case 'Verification':
                return 'Unable to sign in'
            default:
                return 'Authentication Error'
        }
    }
    const getErrorMessage = (errorCode: string) =>
    {
        switch (errorCode)
        {
            case 'Verification':
                return 'The sign in link is no longer valid. It may have been used already or it may have expired.'
            default:
                return 'An unexpected authentication error has occurred. Please email support at hello@davendra.me'
        }
    }

    return (
        <div className='p-6 flex flex-col items-center justify-center space-y-8 w-full h-full max-w-[30rem] min-h-screen mx-auto'>

            <h1 className='font-primary text-center text-amber-500 text-4xl'>
                <span className='text-6xl'>
                    😟
                </span>
                <br />
                {getErrorTitle(errorCode)}
            </h1>

            <h2 className='font-medium text-lg text-center text-slate-700'>
                {getErrorMessage(errorCode)}
            </h2>

            <DashboardLink to={pathToLogin}>
                Login
            </DashboardLink>

        </div>
    )
}