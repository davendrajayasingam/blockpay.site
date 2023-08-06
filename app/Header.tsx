import Logo from './invoices/Logo'

export default function Header()
{
    return (
        <header className='sticky top-0 bg-gray-900 shadow-md border-b border-white/10'>
            <div className='p-4 text-center bg-black/20'>
                <Logo />
            </div>
        </header>
    )
}