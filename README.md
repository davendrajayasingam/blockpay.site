# Setup

## Environment Variables

### Site

`NEXT_PUBLIC_DOMAIN_NAME =''`

### Analytics

`NEXT_PUBLIC_FATHOM_ID=''`

### AWS SES Email

`EMAIL_SERVER_HOST='eg:email-smtp.ap-southeast-1.amazonaws.com'`

`EMAIL_SERVER_PORT=587`

`EMAIL_SERVER_USER=''`

`EMAIL_SERVER_PASSWORD=''`

`EMAIL_FROM='"The Blockpay Team" <no-reply@blockpay.site>'`

`SUPPORT_EMAIL='eg:you@email.com'`

### DB

`FAUNADB_KEY=''`

### Next Auth

> run openssl rand -base64 32 in terminal for the secret

`NEXTAUTH_URL='' // DO NOT SET THIS ON VERCEL. It will be picked up automatically`

`NEXTAUTH_SECRET=''`

### Coinbase

`COINBASE_COMMERCE_API_KEY=''`

`COINBASE_COMMERCE_WEBOOK_SHARED_SECRET=''`
