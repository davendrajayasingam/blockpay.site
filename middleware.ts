import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'

export const config = {
    matcher: [
        '/api/invoice/:function*',
        '/api/contact/:function*',
        '/invoices/:path*',
        '/support/'
    ]
}

export default withAuth(
    async function middleware(request: NextRequest) 
    {
        // The middleware function will only be invoked if the authorized callback returns true.
    },
    {
        callbacks: {
            authorized: async ({ req, token }) =>
            {
                return !!token // If there is a token, the user is authenticated
            }
        }
    }
)