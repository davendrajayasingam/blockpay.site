import Spinner from '@/app/(ui)/Spinner'

export default function Loading()
{
    return <div className='flex flex-col items-center justify-center min-h-screen'>
        <Spinner label='Loading' />
    </div>

}