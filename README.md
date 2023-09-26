# Demo

[https://www.blockpay.site](https://www.blockpay.site)

# Scenario

PathLabs is launching a web3 fintech product. The product allows users to create invoices for their customers and accept cryptocurrency as payment. The Available currency options: BTC, ETH, USDT, USDC

A technical presentation will be arranged with the audience being the CTO, product manager & developer. Please prepare for the presentation with slides on the following:
  
- Technical solution explained using UML diagrams.
- Description of security measures implemented.
- Strategies for scaling up the product.
- Approach to handling transaction disputes.
  
You are also required to produce an MVP that would be able to demonstrate the said requirements. Frontend does not have to be fancy.

*Note : The UML should cater to both technical and non-technical audiences. The slides should be technical, and you can keep the non-technical explanation to the interview session.*

# Presentation

[Google Slides](https://docs.google.com/presentation/d/1S3OhSilFrPoLA5hbtzQT28I3aIEutGOzjcHPx1Xt56o/edit?usp=sharing)

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