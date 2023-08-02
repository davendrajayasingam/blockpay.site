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
                'disabled:bg-slate-400 disabled:cursor-not-allowed',
                'transition-colors ease-in-out duration-300',
                'font-medium text-lg text-center text-white',
                disabled ? '' : 'bg-gradient-to-tr hover:bg-gradient-to-tr from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400',
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