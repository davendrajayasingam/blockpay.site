import { classNames } from '@/utils/helpers/tailwindHelper'
import Spinner from '@/app/(ui)/Spinner'

type Props = {
    type?: 'button' | 'submit',
    showSpinner?: boolean,
    onClick?: () => void,
    fullWidth?: boolean,
    disabled?: boolean,
    children: React.ReactNode
}

export default function SpinnerButton({
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
                'relative min-w-[8rem]',
                'h-11 px-8 py-2 rounded-lg shadow',
                fullWidth ? 'w-full' : '',
                'disabled:bg-slate-400/0 disabled:cursor-not-allowed',
                'transition-colors ease-in-out duration-300',
                'font-medium text-lg text-center text-white',
                disabled ? '' : 'bg-indigo-500 hover:bg-indigo-400',
            )}
            disabled={disabled || showSpinner}
        >
            {
                showSpinner
                    ? <Spinner />
                    : children
            }
        </button>
    )
}