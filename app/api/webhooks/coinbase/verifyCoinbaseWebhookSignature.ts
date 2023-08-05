import { NextRequest } from 'next/server'
import crypto from 'crypto'

const verifyCoinbaseWebhookSignature = async (req: NextRequest, rawBody: string) =>
{
    // get the X-CC-Webhook-Signature header
    const signature = req.headers.get('X-CC-Webhook-Signature')
    
    // hash the body using SHA256 HMAC with your webhook's secret as the key
    const hmac = crypto.createHmac('sha256', process.env.COINBASE_COMMERCE_WEBOOK_SHARED_SECRET!)
    const data = hmac.update(rawBody)
    const gen_hmac = data.digest('hex')

    // return whether the signature is valid, as a boolean
    return gen_hmac === signature
}

export default verifyCoinbaseWebhookSignature