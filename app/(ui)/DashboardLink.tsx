type Props = {
    to: string,
    target?: '_blank' | '_self',
    children: React.ReactNode,
}

export default function DashboardLink({
    to,
    target = '_self',
    children
}: Props)
{
    return (
        <a
            href={to}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : ''}
            className='h-11 px-8 py-2 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-400 transition-colors font-medium text-lg text-center text-teal-50 rounded-lg shadow'
        >
            {children}
        </a>
    )
}