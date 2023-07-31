import AuthError from '@/app/auth/error/AuthError'

export default function ErrorPage({
    params,
    searchParams
}: {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
})
{
    const { error } = searchParams || {}
    return <AuthError errorCode={Array.isArray(error) ? error[0] : (error || '')} />
}