import Spinner from '@/app/(ui)/Spinner'
import { classNames } from '@/utils/helpers/tailwindHelper'

type Props = {
    type?: 'button' | 'submit',
    showSpinner?: boolean,
    onClick?: () => void,
    fullWidth?: boolean,
    disabled?: boolean,
    children: React.ReactNode
}

export default function DashboardSpinnerButton({
    type = 'button',
    showSpinner = false,
    onClick = () => { },
    fullWidth = false,
    disabled = false,
    children
}: Props)
{
    return (
        <button
            type={type}
            onClick={e =>
            {
                e.preventDefault()
                onClick()
            }}
            className={classNames(
                fullWidth ? 'w-full' : '',
                'disabled:bg-slate-400',
                'relative min-w-[8rem] h-11 px-8 py-2 bg-teal-500 hover:bg-teal-400 transition-colors text-teal-50 rounded-lg font-medium text-lg text-center shadow'
            )}
            disabled={disabled || showSpinner}
        >
            <span className={classNames(
                showSpinner ? 'invisible' : 'visible'
            )}>
                {children}
            </span>
            {showSpinner && <Spinner className='absolute inset-0 h-full' />}
        </button>
    )
}