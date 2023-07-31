import { ImSpinner3 } from 'react-icons/im'

type Props = {
    className?: string,
    label?: string
}

export default function Spinner({ className, label }: Props)
{
    return <span className='inline-flex items-center space-x-1'>
        {label && <p className='font-medium text-lg text-slate-700'>{label}</p>}
        <ImSpinner3 className={`w-7 h-7 animate-spin mx-auto text-slate-700 ${className}`} />
    </span>
}