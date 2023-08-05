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
            className='h-11 px-8 py-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-400 transition-colors font-medium text-lg text-center text-sky-50 rounded-lg shadow'
        >
            {children}
        </a>
    )
}