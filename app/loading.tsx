import { BeatLoader } from 'react-spinners'

export default function Loading()
{
    return <div className='flex flex-col items-center justify-center min-h-screen'>
        <BeatLoader size={10} color='#0ea5e9' />
    </div>

}