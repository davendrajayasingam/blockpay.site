import { ValidationSchema } from 'fastest-validator'

const schema: ValidationSchema = {
    $$strict: 'remove',
    paymentCurrency: 'string|length:3|trim:true',
    paymentAmount: 'number|positive',
    customerName: 'string|min:1|trim:true',
    customerEmail: 'email',
    businessName: 'string|optional',
    memo: 'string|optional'
}

export default schema