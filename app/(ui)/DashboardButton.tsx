type Props = {
    type?: 'button' | 'submit',
    onClick?: () => void,
    children: React.ReactNode,
    disabled?: boolean,
}

export default function DashboardButton({
    type = 'button',
    onClick = () => { },
    children,
    disabled = false
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
            className='min-w-[8rem] h-11 px-8 py-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-400 transition-colors font-medium text-lg text-center text-teal-50 rounded-lg shadow'
            disabled={disabled}
        >
            {children}
        </button>
    )
}