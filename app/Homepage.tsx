import Link from 'next/link'

export default function Homepage()
{
    return (
        <div>
            <Link href='/invoices'>
                Dashboard
            </Link>
        </div>
    )
}