// Important Guide: https://alterclass.io/tutorials/magic-link-authentication-in-nextjs-with-nextauth-and-fauna

import NextAuth, { AuthOptions } from 'next-auth'
import { Client as FaunaClient } from 'faunadb'
import { FaunaAdapter } from '@next-auth/fauna-adapter'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'

const client = new FaunaClient({
    secret: process.env.FAUNADB_KEY!,
    scheme: 'https',
    domain: 'db.us.fauna.com',
    port: 443 // port 8443 causes the function to time out. use 443 instead.
})

const authOptions: AuthOptions = {
    // Don't have to define secret here. As long as it's in our .env.local file, it will be picked up automatically.
    // secret: process.env.NEXTAUTH_SECRET!,
    // https://authjs.dev/reference/providers/
    adapter: FaunaAdapter(client),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req)
            {
                // TODO: Add logic here to look up the user from the credentials supplied
                // Return null if user data could not be retrieved
                return null
            }
        }),
        EmailProvider({
            // This is the suggested method. Don't use it. EMAIL_SERVER=smtp://username:password@smtp.example.com:587
            // We have to manually set the 'host, port, and auth'. 
            // If we don't it will cause a timeout and won't work.
            // See https://next-auth.js.org/providers/email
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: 587,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        })
    ],
    pages: {
        signIn: '/auth/login',
        verifyRequest: '/auth/verify-request',
        error: '/auth/error'
    },
    session: {
        // See https://github.com/nextauthjs/next-auth/issues/5170#issuecomment-1228008390
        // See https://next-auth.js.org/configuration/nextjs#caveats, middleware (currently) doesn't support the "database" strategy which is used by default when using an adapter (https://next-auth.js.org/configuration/options#session)
        // The links above is why we need to set the session strategy to 'jwt'
        strategy: 'jwt'
    },
    theme: {
        colorScheme: 'dark', // "auto" | "dark" | "light"
        brandColor: '#0ea5e9', // Hex color code
        logo: '', // Absolute URL to image
        buttonText: '#f1f5f9' // Hex color code
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }