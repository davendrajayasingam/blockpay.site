import { BeatLoader } from 'react-spinners'

type Props = {
    className?: string,
    label?: string
}

export default function Spinner({ className, label }: Props)
{
    return <span className='inline-flex items-center space-x-1'>
        {label && <p className='font-medium text-lg text-slate-700'>{label}</p>}
        <BeatLoader size={10} color='#6366f1' />
    </span>
}